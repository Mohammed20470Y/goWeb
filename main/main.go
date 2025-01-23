package main

import (
	"html/template"
	"net/http"
)

func main() {
	// Serve static files (CSS, JS, images)
	http.Handle("/static/", http.StripPrefix("/static/", http.FileServer(http.Dir("static"))))

	// Define handler for rendering HTML template
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		tmpl, err := template.ParseFiles("cosy.html")
		if err != nil {
			http.Error(w, "could not load template", http.StatusInternalServerError)
			return
		}
		data := map[string]string{"Title": "CosyPOS"}
		tmpl.Execute(w, data)
	})

	// Start the server
	http.ListenAndServe(":8080", nil)
}
