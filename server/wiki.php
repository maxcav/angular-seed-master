<?php
// action=parse: get parsed text
// page=Baseball: from the page Baseball
// format=json: in json format
// prop=text: send the text content of the article
// section=0: top content of the page
function setWiki($wikiSearch) {
	$url = 'http://en.wikipedia.org/w/api.php?action=parse&page=peercoin&format=json&prop=text&section=0';
	$jsonValue .= $wikiSearch;
	$ch = curl_init($url);
	curl_setopt ($ch, CURLOPT_RETURNTRANSFER, 1);
	curl_setopt ($ch, CURLOPT_USERAGENT, "TestScript"); // required by wikipedia.org server; use YOUR user agent with YOUR contact information. (otherwise your IP might get blocked)
	$c = curl_exec($ch);

	$json = json_decode($c);

	$content = $json->{'parse'}->{'text'}->{'*'}; // get the main text content of the query (it's parsed HTML)

	// pattern for first match of a paragraph
	$pattern = '#<p>(.*)</p>#Us'; // http://www.phpbuilder.com/board/showthread.php?t=10352690
	if(preg_match($pattern, $content, $matches))
	{
	    // print $matches[0]; // content of the first paragraph (including wrapping <p> tag)
	    print strip_tags($matches[1]); // Content of the first paragraph without the HTML tags.
	}

	setWiki($_GET["wikiSearch"]);
}

