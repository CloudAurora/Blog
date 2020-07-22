# coding=utf-8

from github import Github
import sys
import json

members = [
    'stkevintan',
    'gbzhu',
    'xuliker',
    '0xHJK',
    'Soulghost',
    'SRaddict',
    'Superlee2013',
]


def get_token():
    flag = False
    for s in sys.argv:
        if flag:
            return s
        if s.strip() == '--token':
            flag = True
    return None


def main():
    g = Github(get_token())

    def get_user(name: str):
        u = g.get_user(name)
        return {
            'url': u.html_url,
            'id': u.id,
            'name': u.name if u.name else name,
            'avatar': u.avatar_url,
            'company': u.company,
            'blog': u.blog,
            'email': u.email,
            'bio': u.bio,
            'location': u.location
        }

    users = map(get_user, members)
    with open('./generated/members.json', 'w') as f:
        json.dump(list(users), f, ensure_ascii=False)


if __name__ == "__main__":
    main()
