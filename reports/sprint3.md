# Sprint 3 - *t11* - *Five Angry Men*

## Goal
### *How far is it?*

## Sprint Leader: 
### *Alec Watkins*

## Definition of Done

* The Increment release for `v3.x` created as a GitHub Release and deployed on black-bottle under SPRINT.
* The design document (`design.md`) is updated.
* The sprint document (`sprint.md`) is updated with scrums, completed metrics, review, and retrospective.

## Policies

### Mobile First Design
* Design for mobile, tablet, laptop, desktop in that order.
* Use ReactStrap for a consistent user experience (no HTML, CSS, style, etc.).

### Clean Code
* Code Climate maintainability of A (technical debt ratio < 5).
* Minimize code smells and duplication.

### Test Driven Development
* Write the tests before the code.
* Unit tests are fully automated.
* Code coverage is 70%

### Processes
* Incremental development.  No big bangs.
* Main is never broken. 
* All pull request builds and tests for Main are successful.
* All dependencies managed using Maven, npm, and WebPack.
* GitHub etiquette is followed always.


## Planned Epics
  ### Find Places
  Given a search bar, the user should be able to find a place (using a name, type, or 
  other criteria) and be given a list of options to choose from, with those choices being 
  organized by user specifications.
  ### Protocol Distance Feature
  Database communication of distance with the RestAPI and client.
  ### Calculate Distances
  This will show the total distance of all the places clicked during the entire time on the
  webpage, will show distance between adjacent places on the tour, as well as show the total
  tour distance.
  ### Show Trip
  On the map, the user will be able to see the lines connecting selected places of their tour
  on the map.
  ### Mark Places
  When the user clicks a specific location on their trip list, it will move the map to that
  location and display a popup with the place details.
## Metrics

| Statistic | # Planned | # Completed |
| --- | ---: | ---: |
| Epics | *5* | *4* |
| Tasks |  *41*   | *35* | 
| Story Points |  *56*  | *51* | 

Based on our performance from Sprint 2, we were able to complete 4 epics, with losing a team member which lead to lost time and setbacks. We will be able to at least complete 4 epics this sprint, especially given that we have planned our story points and tasks better
which will allow us to be more efficient and allow for better incremental development.


## Scrums

| Date | Tasks closed  | Tasks in progress | Impediments |
| :--- | :--- | :--- | :--- |
| *3/3* | *11* | *2* | None | 
| *3/5* | *14* | *3* | None|
| *3/8* | *20* | *2* | None|
| *3/10* | *22* | *3* | None|
| *3/12* | *26* | *5* | None|
| *3/17* | *35* | *2* | Indy broke his nose|



## Review

### Epics completed
Find Places, Protocol Distance Feature, Mark Places, Calculate Distances

### Epics not completed 
Show Trip

## Retrospective

### Things that went well
We did a really good job planning. There was a noticeable difference in how much smoother and more we felt to accomplish this sprint.

We were able to complete 4 epics through efficient planning and communication. By just communicating and having a great plan, this sprint went far better than last sprint.

### Things we need to improve
We need to improve on completing our inspection tasks, and be sure to plan some more time for them at the beginning of the sprint. We also need to improve on procrastinating, we did a lot better than last sprint, but there is certainly much more room for improvement in that area, and once accomplished we will be able to complete more epics. We also need to be sure to write tests for code before it is merged into main.

Our team could probably spend more time on inspections and finding defects/bugs instead of just tidying up code. 

### One thing we will change next time
We will make sure to keep inspections in the back of our mind for planning the next sprint.

Our team will be sure to handle procrastination better next sprint. 
