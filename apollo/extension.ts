
import { SchemaDirectiveVisitor } from 'graphql-tools'
import gql from 'graphql-tag'
import { GraphQLField, defaultFieldResolver, GraphQLString, GraphQLScalarType, Kind, GraphQLObjectType, GraphQLInterfaceType, GraphQLID } from 'graphql'
import moment, { Moment } from 'moment'
import { createHash } from 'crypto';
import { PublicConfig } from './server-config';


export const PRE_DEFS = gql`
directive @date(format: String) on FIELD_DEFINITION
directive @auth(requires: Role = ADMIN) on OBJECT | FIELD_DEFINITION
directive @uniqueID(
  name: String = "uid"
  from: [String] = ["id"]
) on OBJECT
  # Since this type just uses the default values of name and from,
  # we don't have to pass any arguments to the directive:
  # type Location @uniqueID {
  #   id: Int
  #   address: String
  # }

  # This type uses both the person's name and the personID field,
  # in addition to the "Person" type name, to construct the ID:
  # type Person @uniqueID(from: ["name", "personID"]) {
  #   personID: Int
  #   name: String
  # }
enum Role {
  ADMIN
  AUTHOR
  USER
}

scalar Date
`

export const scalars: Record<string, GraphQLScalarType> = {
    Date: new GraphQLScalarType({
        name: 'Date',
        description: 'Date scalar type',
        parseValue(value: string) {
            return moment(value);
        },
        serialize(value: Moment) {
            return value.format(PublicConfig.common.timeFormatter);
        },
        parseLiteral(ast) {
            if (ast.kind === Kind.STRING || ast.kind === Kind.INT) {
                return moment(ast.value);
            }
            return null;
        }
    }),
}

export class FormattableDateDirective extends SchemaDirectiveVisitor {
    public visitFieldDefinition(field: GraphQLField<void, any>) {
        const { resolve = defaultFieldResolver } = field;
        const { format } = this.args;

        field.resolve = async (source, args, context, info) => {
            const date = await resolve(source, args, context, info);
            return moment(date).format(format || PublicConfig.common.timeFormatter);
        };

        field.type = GraphQLString;
    }
}


export class AuthDirective extends SchemaDirectiveVisitor {
    visitObject(type: GraphQLObjectType) {
        this.ensureFieldsWrapped(type);
        (type as any)._requiredAuthRole = this.args.requires;
    }
    // Visitor methods for nested types like fields and arguments
    // also receive a details object that provides information about
    // the parent and grandparent types.
    visitFieldDefinition(field: GraphQLField<any, any>, details: {
        objectType: GraphQLObjectType | GraphQLInterfaceType
    }) {
        this.ensureFieldsWrapped(details.objectType);
        (field as any)._requiredAuthRole = this.args.requires;
    }

    ensureFieldsWrapped(objectType: GraphQLObjectType | GraphQLInterfaceType) {
        // Mark the GraphQLObjectType object to avoid re-wrapping:
        if ((objectType as any)._authFieldsWrapped) return;
        (objectType as any)._authFieldsWrapped = true;

        const fields = objectType.getFields();

        Object.keys(fields).forEach(fieldName => {
            const field = fields[fieldName];
            const { resolve = defaultFieldResolver } = field;
            field.resolve = async function (...args) {
                // Get the required Role from the field first, falling back
                // to the objectType if no Role is required by the field:
                const requiredRole =
                    (field as any)._requiredAuthRole ||
                    (objectType as any)._requiredAuthRole;

                if (!requiredRole) {
                    return resolve.apply(this, args);
                }

                // const context = args[2];
                // const user = await getUser(context.headers.authToken);
                // if (!user.hasRole(requiredRole)) {
                //   throw new Error("not authorized");
                // }

                return resolve.apply(this, args);
            };
        });
    }
}

export class UniqueIdDirective extends SchemaDirectiveVisitor {
    visitObject(type: GraphQLObjectType) {
        const { name, from } = this.args;
        const fields = type.getFields();
        if (name in fields) {
            throw new Error(`Conflicting field name ${name}`);
        }

        fields[name] = {
            ...fields[name],
            name,
            type: GraphQLID,
            description: 'Unique ID',
            args: [],
            resolve(object) {
                const hash = createHash("sha1");
                hash.update(type.name);
                from.forEach((fieldName: string) => {
                    hash.update(String(object[fieldName]));
                });
                return hash.digest("hex");
            }
        };
    }
}

export const directives = {
    date: FormattableDateDirective,
    auth: AuthDirective,
    uniqueID: UniqueIdDirective
}