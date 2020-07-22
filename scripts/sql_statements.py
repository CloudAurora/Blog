CREATE_STATMENT = """
PRAGMA foreign_keys=OFF;

DROP TABLE IF EXISTS User

DROP TABLE IF EXISTS Post 

DROP TABLE IF EXISTS Category 

DROP TABLE IF EXISTS Tag 

DROP TABLE IF EXISTS _PostToTag 

DROP TABLE IF EXISTS _CategoryToPost 

CREATE TABLE "User" (
"bio" TEXT   ,"email" TEXT NOT NULL  ,"githubId" TEXT   ,"id" INTEGER NOT NULL  PRIMARY KEY AUTOINCREMENT,"name" TEXT   )

CREATE TABLE "Post" (
"authorId" INTEGER   ,"content" TEXT   ,"createdAt" DATE NOT NULL  ,"draft" BOOLEAN NOT NULL DEFAULT false ,"excerpt" TEXT   ,"id" INTEGER NOT NULL  PRIMARY KEY AUTOINCREMENT,"slug" TEXT NOT NULL  ,"source" TEXT NOT NULL  ,"title" TEXT NOT NULL  ,"updatedAt" DATE NOT NULL  ,FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE)

CREATE TABLE "Category" (
"id" INTEGER NOT NULL  PRIMARY KEY AUTOINCREMENT,"name" TEXT NOT NULL  ,"slug" TEXT NOT NULL, "count" INTEGER NOT NULL  )

CREATE TABLE "Tag" (
"id" INTEGER NOT NULL  PRIMARY KEY AUTOINCREMENT,"name" TEXT NOT NULL  ,"slug" TEXT NOT NULL,  "count" INTEGER NOT NULL  )

CREATE TABLE "_CategoryToPost" (
"A" INTEGER NOT NULL  ,"B" INTEGER NOT NULL  ,FOREIGN KEY ("A") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE,
FOREIGN KEY ("B") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE)

CREATE TABLE "_PostToTag" (
"A" INTEGER NOT NULL  ,"B" INTEGER NOT NULL  ,FOREIGN KEY ("A") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE,
FOREIGN KEY ("B") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE)

CREATE UNIQUE INDEX "User.email" ON "User"("email")

CREATE UNIQUE INDEX "User.name" ON "User"("name")

CREATE UNIQUE INDEX "Post.title" ON "Post"("title")

CREATE UNIQUE INDEX "Post.slug" ON "Post"("slug")

CREATE UNIQUE INDEX "Category.name" ON "Category"("name")

CREATE UNIQUE INDEX "Category.slug" ON "Category"("slug")

CREATE UNIQUE INDEX "Tag.name" ON "Tag"("name")

CREATE UNIQUE INDEX "Tag.slug" ON "Tag"("slug")

CREATE UNIQUE INDEX "_CategoryToPost_AB_unique" ON "_CategoryToPost"("A","B")

CREATE  INDEX "_CategoryToPost_B_index" ON "_CategoryToPost"("B")

CREATE UNIQUE INDEX "_PostToTag_AB_unique" ON "_PostToTag"("A","B")

CREATE  INDEX "_PostToTag_B_index" ON "_PostToTag"("B")

PRAGMA foreign_key_check;

PRAGMA foreign_keys=ON;
"""


INSERT_USER_STATEMENT = """
    INSERT INTO User(bio, email, githubId, name)
    VALUES(?,?,?,?)
    ON CONFLICT(name) DO NOTHING
"""

INSERT_CATEGORIES_STATEMENT = """
    INSERT INTO Category(name, slug, count)
    VALUES(?,?,?)
    ON CONFLICT(name) DO UPDATE SET count=count+1
"""

INSERT_TAGS_STATEMENT = """
    INSERT INTO Tag(name, slug, count)
    VALUES(?,?,?)
    ON CONFLICT(name) DO UPDATE SET count=count+1
"""

INSERT_POST_STATEMENT = """
    INSERT INTO Post(authorId, content, draft, excerpt, slug, source, title, createdAt, updatedAt)
    VALUES(?,?,?,?,?,?,?,?,?)
"""

INSERT_POST_CATEGORY_STATEMENT = """
    INSERT INTO _CategoryToPost(A, B)
    VALUES(?,?)
"""

INSERT_POST_TAG_STATEMENT = """
    INSERT INTO _PostToTag(A, B)
    VALUES(?,?)
"""
