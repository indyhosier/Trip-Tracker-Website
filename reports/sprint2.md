# Sprint 2 - *t11* - *Five Angry Men*

## Goal
### *More ways to add places to the trip.*

## Sprint Leader: 
### *Jesse Jason*

## Definition of Done

* The Increment release for `v2.x` created as a GitHub Release and deployed on black-bottle under SPRINT.
* The design document (`design.md`) is updated.
* The sprint document (`sprint.md`) is updated with scrums, completed metrics, review, and retrospective.

## Policies

### Mobile First Design
* Design for mobile, tablet, laptop, desktop in that order.
* Use ReactStrap for a consistent user experience (no HTML, CSS, style, etc.).

### Clean Code
* Code Climate maintainability of A or B.
* Minimize code smells and duplication.

### Test Driven Development
* Write the tests before the code.
* Unit tests are fully automated.

### Processes
* Main is never broken. 
* All pull request builds and tests for Main are successful.
* All dependencies managed using Maven, npm, and WebPack.
* GitHub etiquette is followed always.


## Planned Epics
  ### Protocol find feature
  Database communication with the RestAPI and client.
 ### Where am I?
  When a user opens the page, the marker should be placed on their current location. This should also occur when the user clicks a button (to be made). Said location should be added to the location history, along with details.
  ### Where is?
  When the user enters a latitude and longitude (in a variety of formats), the map marker moves there and provides details about the location, both in the location history and on the marker itself.
  ### Find places
  Given a search bar, the user should be able to find a place (using a name, type, or other criteria) and be given a list of options to choose from, with those choices being organized by user specifications.
 ### Place details
  On both the location history and the map marker, details (including name, municipality) should be displayed to the user when a location is selected.
  ### Maps
  Give the ability to change the map backround and remember the selection for future sessions

## Metrics

| Statistic | # Planned | # Completed |
| --- | ---: | ---: |
| Epics | *5* | *4* |
| Tasks |  *17*   | *24* | 
| Story Points |  *21*  | *35* | 

Based on our performance on Sprint 1, we were able to complete 3 Epics for a grand total of 31 story points. It is likely that we will be able to complete AT LEAST 3 Epics during this sprint, with story point distrubution changing throughout the course of the Epic based on the difficulty of the tasks.


## Scrums

| Date | Tasks closed  | Tasks in progress | Impediments |
| :--- | :--- | :--- | :--- |
| *2/10/20* | *1* | *3* |  | 
| *2/12/20* | *3* | *6* |  | 
| *2/17/20* | *6* | *4* |  | 
| *2/22/20* | *13* | *6* | *Lost team member* | 
| *2/24/20* | *16* | *8* |  | 



## Review

### Epics completed  
Protocol find feature, Where Am I, Where Is, Place Details

### Epics not completed 
Find Places

## Retrospective

### Things that went well
We were able to work through a lot of conflict this sprint. We lost a team member and about 4 days of work in the proccess, but we were able to overcome in some fashion. We learned a lot of lessons about communicating, and due to the loss of a team member bonded a lot more throughout this sprint.

Our team was able to complete four epics, despite losing a team member and a large chunk of work time. We were also able to meet on a more regularly, plan accordingly, and adapt as needed.

### Things we need to improve
Story point and task distribution was incredibly below average in the mid-sprint review. Better planning in the beginning of the sprint may make the rest of the cycle smoother. We need to break our tasks up into smaller, more managable tasks when necessary. We will also improve utilizing the help desk more to answer our questions when we get stuck.

Instead of having each of us rely on eachother to do work we were stuck on, the TA's and help desk hours will prove to be beneficial to completing tasks more efficiently. By breaking down epics into more than just one or two tasks, it will help us in the long run by not waiting on one person to complete a task before moving on to the next epic/task. 

### One thing we will change next time
How we break epics into tasks. We will also make sure we are completing more Epics before the half way point to help prevent us from procrastinating.

Better planning by communicating who will take on each task will allow us to get work done more efficiently and in a better timely manner. In addition to this, instead of doing multiple file/line changes in one lare pull request, we will improve our efficiency with incremental development by making smaller commits and pull requests. 
