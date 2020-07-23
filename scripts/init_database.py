import frontmatter
import casestyle
import urllib.parse
import os
import sys
from typing import (IO, Any)
from datetime import datetime
import sqlite3
from github import Github
from sql_statements import *

print("sqlite3 version:", sqlite3.version)
print("sqlite3.sqlite_version:", sqlite3.sqlite_version)


def get_params(key: str):
    flag = False
    for s in sys.argv:
        if flag:
            return s
        if s.strip() == key:
            flag = True
    return None


def slugfy(name: str):
    url = casestyle.kebabcase(name)
    return urllib.parse.quote(url, safe='')

def to_timestamp(iso_datetime: str):
    dt = datetime.fromisoformat(iso_datetime).timestamp()
    return int(round(dt * 1000))

def read_file(f: IO[Any], path: str, base: str):
    metadata, content = frontmatter.parse(f.read())
    mtime = datetime.fromtimestamp(os.path.getmtime(path))
    meta = {
        'slug': slugfy(metadata.get('slug', base)),
        'title': metadata.get('title', base.capitalize()),
        'author': metadata.get('author'),
        'createdAt': to_timestamp(metadata.get('date', mtime.isoformat())),
        'updatedAt': to_timestamp(mtime.isoformat()),
        'draft': False,
        'tags': metadata.get('tags', []),
        'categories': metadata.get('categories', []),
        'source': path
    }
    excerpt = content.split('<!--more-->', 1)[0]
    return meta, excerpt, content


def walk():
    root = get_params('-r')
    if not root:
        raise Exception(
            "please use '-r <root-dir>' to specify the root directory.")

    for parent, _, files in os.walk(root):
        for name in files:
            (base, ext) = os.path.splitext(name)
            if ext != '.md' and ext != '.mdx':
                continue
            p = os.path.join(parent, name)
            with open(p, 'r') as f:
                yield read_file(f, p, base)


DB_FILE = os.path.join('./public', 'dev.db')


def create_db():
    conn = sqlite3.connect(DB_FILE)
    c = conn.cursor()
    for stat in CREATE_STATMENT.split('\n\n'):
        if stat:
            c.execute(stat)
    conn.commit()
    c.close()

    return conn


Members = {}
DefaultUser = ('', 'unknown@unknown.com', '22012452', 'admin')
g = Github(get_params('--token'))


def get_members(author: str):
    if not author:
        return DefaultUser
    if author in Members:
        return Members[author]
    try:
        u = g.get_user(author)
        Members[author] = (
            u.bio, u.email or 'unknown@unknown.com', u.id, u.name)
        return Members[author]
    except:
        return DefaultUser


if __name__ == "__main__":
    with create_db() as conn:
        c = conn.cursor()
        AuthorId = {}
        CategoryId = {}
        TagId = {}
        for meta, excerpt, content in walk():
            # update author
            author = meta['author']
            author_info = get_members(meta['author'])
            if author not in AuthorId:
                c.execute(INSERT_USER_STATEMENT, author_info)
                AuthorId[author] = c.lastrowid

            # update category
            for category in meta['categories']:
                c.execute(INSERT_CATEGORIES_STATEMENT,
                          (category, slugfy(category), 0))
                if category not in CategoryId:
                    CategoryId[category] = c.lastrowid

            # update tag
            for tag in meta['tags']:
                c.execute(INSERT_TAGS_STATEMENT, (tag, slugfy(tag), 0))
                if tag not in TagId:
                    TagId[tag] = c.lastrowid

            # update post
            c.execute(INSERT_POST_STATEMENT, (
                AuthorId[author],
                content,
                meta['draft'],
                excerpt,
                meta['slug'],
                meta['source'],
                meta['title'],
                meta['createdAt'],
                meta['updatedAt']
            ))

            post_id = c.lastrowid

            # category - post
            for category in meta['categories']:
                category_id = CategoryId[category]
                c.execute(INSERT_POST_CATEGORY_STATEMENT,
                          (category_id, post_id))

            # post - tags
            for tag in meta['tags']:
                tag_id = TagId[tag]
                c.execute(INSERT_POST_TAG_STATEMENT, (post_id, tag_id))

        c.close()
        conn.commit()
        print("Create db file in: %s, and env is set" % DB_FILE)
