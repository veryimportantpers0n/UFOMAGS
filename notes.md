Testing backgrounds:


# UFO Mags Background Testing
cd TESTING
python -m http.server 3456
# Then visit: http://localhost:3456



http://localhost:3456/





Things to do:

Make a login page so i can share it and nobody can see.



FERSH SSITE DESIGN:






Glitch text effect for the main home page text:

body {
    animation: glitch 1s infinite alternate;
}

@keyframes glitch {
    0% { text-shadow: 0.05em 0 0 #f00, -0.05em 0 0 #0ff; }
    14% { text-shadow: 0.05em 0 0 #f00, -0.05em 0 0 #0ff; }
    15% { text-shadow: -0.05em 0 0 #f00, 0.05em 0 0 #0ff; }
    49% { text-shadow: -0.05em 0 0 #f00, 0.05em 0 0 #0ff; }
    50% { text-shadow: 0.05em 0 0 #f00, -0.05em 0 0 #0ff; }
    99% { text-shadow: 0.05em 0 0 #f00, -0.05em 0 0 #0ff; }
    100% { text-shadow: -0.05em 0 0 #f00, 0.05em 0 0 #0ff; }
}

WE hahve been making a site and im very happy with the backed end buut the front end is horrible and i think its beacuse i said i wanted 90s theme and i dont I have made the AI make me the exact site i want do you think you could completely chanmge the front end of the site to be like my new desing but be next .js ?? can you make a gameplan ?

the design i have saved in testing folder and is called " NEWSITEDESINGCONECPT.html"


FOOTER:



New site desing :

the "DESCRYPT SIGNAL" box will be the search box. 

I want to use the new background.




Can you now help me wriote a text to explain :

All our magazines are hosted on the internet archeive for copyright reasons, the magainze reader prov ided from them can be buggy so please reset

change this:

For the best reading experience with full page controls, open the magazine in Internet Archive's full viewer.




New goal


is to add social and about to one page put the boxes each on one side. 



Instead of using images for all the doucments and having hundereds of images i think its better to use SVGs, I have created a folder called SVGs and have put all the SVGs in there. in testing and hte folder is called "SVG ICONS".

Can we make a master docuemnt that says what uses what and find the optimal location to put the svg that is neat and tidy but also works when i upload the site to host on cloudflare pages as a static site.

types of documemnts and what svg they use:

Alien sighting : alien.svg
Documents on crafts : craft.svg
Full report : fullreport.svg
One that are leaks: intelligence.svg
legal docs : legal.svg
logs : logs.svg
All magazines will use : magazine.svg
Reseach file will use : research.svg


there is also a file called "hologrameffectidea.md" which my idea is to make these svgs have a holographic effect, i dont know if this is the best way but to use as refrence when we implement it, i think to keep the site neat we make it a seprate component aswell. 


can you now write a gameplan to replace using the images an use these svgs in all the relvant places, the ones i can think of is the http://localhost:3000/magazines/, http://localhost:3000/declassified/ and when you are on document slug the icons for hte files in the ":: RELATED DOCUMENTS" under the doucment.

Can you now do a serach of how the site currently handles it and make a implentation plan.












full memo: Logs.svg


All highly redacted will use : highlyredacted.svg