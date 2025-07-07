1. i missed the import of app.css fine in app.js, so no style in css file applied to the components.
    1.1 we need to import css file in single file and that will be applied to all it's children
2. Fetch instead of axios as axios needs to be installed externally to use. And this particular scenario doesn't need that
3. it's not a good practice to use two awaits in single line. but it works. so two lines for res and jsonData
4. it's good to use fallback while loading instead of displaying error message
5. lines under catch block will be executed. but if the catch block throws any error or has return statement then the lines will not eecute. Here comes the finally block to execute the lines anyway. mainly used in closing the operations, logging etc.,