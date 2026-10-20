from .search_articles import search_articles
from .search_users import search_users
from .sort_results import sort_results
from ...schemas.enum.content_type import ContentType
from ...schemas.article import ArticleData
from ...schemas.user import UserData

# All Types with their own function to search
SEARCH_FUNCTIONS = {
    ContentType.article: search_articles,
    ContentType.user: search_users
}

# All Types with validation schematic
VALIDATION_schemas = {
    ContentType.article:  ArticleData,
    ContentType.user: UserData
}


# -- main search function --
def search(query, filters, sort_by, offset, length, db):

    results = []

    # - get results & validate them -
    for type, func in SEARCH_FUNCTIONS.items():

        if (type not in filters.content_type) and (filters.content_type != []):
            continue
        
        # get
        results_of_type = func(query, filters, db)

        # validate & add to all the results
        results.extend(
            [VALIDATION_schemas[type].model_validate(r, from_attributes=True) for r in results_of_type]
        )


    # - sort results -
    sorted_results = sort_results(query, results, criteria=sort_by)


    return sorted_results[offset:offset+length]