# todo-app
To do app project from Frontend Mentor aka 'Who Knew Custom Checkboxes Were Such a Challenge'

Here's the original Frontend Mentor challenge: https://www.frontendmentor.io/challenges/todo-app-Su1_KokOW

This is my first proper JavaScript project. After finishing it I wanted to improve accessibility by allowing full use of the app without a cursor. The delete buttons and the clearing of completed tasks have so far refused to cooperate so I'll have to revisit that later.

I've done my best to follow the MVC architecture. The app uses local storage to save the to dos as a stringified array of objects. You can toggle between light and dark mode and filter to see only active or completed to dos. As a bonus challenge I implemented the ability to drag and drop items to reorder the list. This was a big challenge for me with lots of googling and adapting possible solutions. The feature works but unfortunately the new order of the items doesn't get saved between refreshes.

I used Sass for styling, and the app looks neat in every size, though 4K screens will have quite a bit of empty space. My biggest challenge there were the checkboxes with a custom gradient background. After several attempts I finally got them working. The model design suggests that in dark mode the checkboxes should have a gradient border on hover. I was able to achieve that only with square checkboxes, not round ones, but decided to spend my time on more essential things and just have a blue hover border.

Overall I'm quite satisfied with the end result. As I'm typing this readme, I see some improvements I could make but for a first real project that intimidated me a bit to start off, it's not bad at all. Here's screenshots of light mode on mobile and dark mode on desktop:

<img width="319" alt="todo-app-ss1" src="https://github.com/codenamecat/todo-app/assets/113186187/06ef70fa-85f2-4289-a51a-e95481b1dd91">
<img width="1024" alt="todo-app-ss2" src="https://github.com/codenamecat/todo-app/assets/113186187/2e2c4452-9b67-4232-a7aa-d4c07e0b2acf">
