package main

import (
	"html/template"
	"net/http"
)

var (
	mux http.ServeMux
)

func handler(w http.ResponseWriter, r *http.Request) {
	// Serve static files (CSS, JS, images)
	http.Handle("/static/", http.StripPrefix("/static/", http.FileServer(http.Dir("static"))))
	tmpl, err := template.ParseFiles("cosy.html")
	if err != nil {
		http.Error(w, "could not load template", http.StatusInternalServerError)
		return
	}
	data := map[string]string{"Title": "store"}
	tmpl.Execute(w, data)
}

func main() {
	println("server is run localhost and on port 8080")
	mux.HandleFunc("/", handler)
	http.ListenAndServe(":8080", &mux)
}
