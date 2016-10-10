# Gift-Registry
A gift registry website that is free from association with any single
store.  Among other things, it allows a user to indicate if an item can be
purchased used or not, which is more pertinent for baby registries than
other kinds of registries.  [Gift Registry Freedom](https://gift-registry-freedom.herokuapp.com/home).

## 1. Technologies Used
- I used [Trello](https://trello.com/b/ANU4xu98) for all planning, breaking
things up into `Bugs`, `To Do`, `Working On`, `Not Functioning as Desired`,
`Functioning as Desired`, and `Complete`.  I used labels to indicate if the card
was a MVP requirement for the project, a reach goal, or a personal reach goal.

- I used [creately.com](https://creately.com/diagram/itubigp51/LcRG9WTAPfuFpacGpTrRA4cOFg%3D) for ERD, site diagramming, and file/directory structures.

- I used [Justinmind](https://www.justinmind.com/free-wireframing-tool) for wireframing.


## 2. My Approach
### Planning
Throughout Monday I planned out the project by creating a trello board,
wireframe, ERD, site diagram, directory structure, and the routes I would need.
Monday night I began scaffolding the routes so that they would simply show
`working`.  I also built out the directory structure, which was very easy after
having planned it out.

### More Planning

Tuesday I began building layout.hbs.  Shortly thereafter, I realized I had left
out a few routes, and that my Schemas weren't complete.  Twice on Tuesday I
paused what I was doing to go back to the drawing board and modify the plans I
had made Monday.  But by the end of the day Tuesday, over 95% of what I executed
the rest of the week had been accurately planned.

### Executing

Trello is my best friend.  I have a tendency to see tangential problems when I'm
working on something, and sometimes I will stop working on the issue at hand and
move to the tangential problem.  However, keeping Trello up at all times,
referring to it regularly, and making sure I'm working on only one thing at a
time kept me laser-focused and allowed me to be very productive.

I did my best to stay focused on the issue at hand, and to create something that
worked, not necessarily something that looked nice.  That was also a struggle
for me because I tend to be much more interested in design and frontend than
backend.  I focused on creating the MVP; if I hadn't, my app would not even be
what it is right now.

### Aesthetics

It wasn't until Friday afternoon that I began tweaking the site to make it more
attractive.  I did not quite have my MVP, but I had been using HTML tables to
display registry information, and even though I planned to use another approach
later, HTML tables were quick and easy to implement.  However, I began to run
into their limitations with Handlebars so I refactored my display pages to use
`flexbox cards`, which are far more attractive than tables.

I got my MVP working sometime Saturday, and was able to spend a few short hours
improving the aesthetics, but there is still much to be done.

## 3. Unsolved Problems

### Change Functionality

When a user adds a new item to their registry, it is currently added at the
bottom of the page, but it should be added at the top so the user immediately
knows that it worked.  I need to modify my Schemas because despite my best
planning, I eventually realized that I initially put things in there that don't
matter, and left out things that do.

### Add Functionality

I would like the user to be able to mark an item in their registry as "most
wanted", and for the user to be able to categorize an item as "furniture",
"diapers", "clothing", etc.  The user should be auto-logged in after they sign
up, and taken to a page that prompts them to input more information, rather than
all of the information being asked on the landing page.  They should also be
able to indicate the day of their event (in this case, when the baby is due), so
that other users will know and plan accordingly.

I would also like to expand the site so that users can create any kind of gift
registry they want--wedding, birthday, Christmas, bar mitzvah, quinceanera, etc.

### Change Aesthetics

There are several aesthetic changes I would like to make, such as creating a nav
bar, the signup/login form should be more attractive, if a user designates that
an item can be purchased used, it shouldn't display `New: false`, but rather
something more meaningful to the user like `Purchased Used`.

The user should be able to upload an image of themselves and their partner, to
be displayed on the search results page, which will help another user find the
correct registry.  


## 4. Notes to Self

Everything I would say to myself is already listed above.  Oh, plus you're
handsome.

## 5. User Stories
See userStories.md
