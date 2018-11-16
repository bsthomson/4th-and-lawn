import pandas as pd
from splinter import Browser
from splinter import exceptions
import json


def get_espn_ids(url=None):
    browser = Browser('chrome', headless=True)
    browser.visit(url)
    count = 1

    kvs = {}

    for section in range(1, 7):
        for column in range(1, 3):
            if column is 2 and section is 6:
                continue

            for row in range(1, 13):
                xpath = '//*[@id="fittPageContainer"]/div[3]/div[1]/div/div[1]/div[2]/div[{}]/div[{}]/section/section[{}]/div/section/div/a'.format(
                    column, section, row)

                try:
                    result = browser.find_by_xpath(xpath)['href']
                    name = browser.find_by_xpath(xpath).text
                    team_id = result.split('/')[-2]
                    kvs[name] = team_id

                    print count, team_id, name
                    count = count + 1
                except exceptions.ElementDoesNotExist:
                    continue

    return kvs


def get_basketball_stadiums(team_name=None):
    browser = Browser('chrome', headless=True)
    browser.visit(
        "https://en.wikipedia.org/wiki/List_of_NCAA_Division_I_basketball_arenas")

    if team_name:
        stadium_name = ''
    else:
        stadium_names = {}

    for x in range(1, 355):
        try:
            name_tag = browser.find_by_xpath(
                '//*[@id="mw-content-text"]/div/table[2]/tbody/tr[{}]/td[5]/a'.format(x))
            name = ' '.join(name_tag['href'].split('/')[-1].split('_'))

            if name == team_name or team_name is None:
                link_tag = browser.find_by_xpath(
                    '//*[@id="mw-content-text"]/div/table[2]/tbody/tr[{}]/td[2]/a'.format(x))

                stadium_name = ' '.join(
                    link_tag['href'].split('/')[-1].split('_'))

                print name, '\t\t', stadium_name

                if team_name:
                    return stadium_name
                else:
                    stadium_names[name] = stadium_name
                
        except exceptions.ElementDoesNotExist:
            continue

    return stadium_names


def main():
    # ids = get_espn_ids(url="http://www.espn.com/mens-college-basketball/teams")
    # print ids
    # with open("./Data/basketball_team_ids.json", "w") as write_file:
    #     json.dump(ids, write_file)

    stadium_names = get_basketball_stadiums(team_name=None)
    with open("./Data/basketball_stadium_names.json", "w") as write_file:
        json.dump(stadium_names, write_file)


if __name__ == '__main__':
    main()
