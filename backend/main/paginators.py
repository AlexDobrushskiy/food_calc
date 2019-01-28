from collections import OrderedDict

from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response


class PageNumberPaginationWithCurrentPageNumber(PageNumberPagination):
    def get_paginated_response(self, data):
        return Response(OrderedDict([
            ('count', self.page.paginator.count),
            ('current_page', self.page.number),
            ('next', self.get_next_link()),
            ('previous', self.get_previous_link()),
            ('max_page', int(self.page.paginator.count/self.page_size)+1),
            ('results', data)
        ]))
