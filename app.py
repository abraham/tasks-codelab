from bottle import get, run, template, static_file, debug

@get('/')
def index():
    return template('index.html')

@get('/js/<filename:path>')
def get_static(filename):
    return static_file(filename, root='js')
@get('/css/<filename:path>')
def get_static(filename):
    return static_file(filename, root='css')
@get('/img/<filename:path>')
def get_static(filename):
    return static_file(filename, root='img')

debug(mode=True)
run(host='localhost', port=8080, reloader=True)