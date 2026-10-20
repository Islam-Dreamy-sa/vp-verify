FROM nginx:1.27-alpine
# Tries to label itself into a weaker profile; the platform's --label must win.
LABEL sa.dreamy.portal.profile=legacy
COPY default.conf.template /etc/nginx/templates/default.conf.template
COPY index.html /usr/share/nginx/html/index.html
