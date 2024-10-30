from flask import Flask, render_template, request, redirect, url_for
import os

app = Flask(__name__)

# Ruta principală pentru pagina ta
@app.route('/')
def main_page():
    return render_template('main.html')

# Endpoint pentru "Add Topic"
@app.route('/add_topic', methods=['POST'])
def add_topic():
    topic_name = request.form.get('topic_name')
    filename = f"templates/{topic_name}.html"

    # Crează un fișier HTML nou pentru topic
    with open(filename, 'w') as f:
        f.write(f"""<!DOCTYPE html>
<html>
<head>
 <title>{topic_name}</title>
</head>
<body>
 <h1>{topic_name}</h1>
 <p>Aici vei adăuga conținutul pentru topicul {topic_name}</p>
</body>
</html>""")
    
    return redirect(url_for('main_page'))

if __name__ == '__main__':
    app.run(debug=True)
