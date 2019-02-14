"""django_project URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.8/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""

from django.conf.urls import include, url
from django.contrib import admin

from django.views.generic.base import RedirectView

favicon_view = RedirectView.as_view(url='/static/favicon.ico', permanent=True)


class BundlesRedirect(RedirectView):  # Redirects to webpack bundles

    permanent = True
    query_string = True

    def get_redirect_url(self, url):
        return '/static/bundles/' + url


urlpatterns = [
    url(r'^favicon\.ico$', favicon_view),
    url(r'^([^/]*\.(?:js|css))$', BundlesRedirect.as_view(), name='bundles'),
    url(r'^react_test/', include('react_test.urls', namespace="react_test")),
    url(r'^polls/', include('polls.urls', namespace="polls")),
    url(r'^admin/', include(admin.site.urls)),
    url(r'^', include('reactapp.urls', namespace="reactapp")),
]
