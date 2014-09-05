//clears my content div
$('#content').empty();

//give the article a id so we can hook up the css to it.
$('article.main').     attr("id", "loginPage");

//add stuff to content, this will be broken out into a templ design
$('#content').append('<p>This will be the html for the login page!</p>');