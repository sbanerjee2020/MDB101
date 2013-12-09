<!DOCTYPE html>
<html>
<head>
    <title>Hello World</title>
</head>
<body>
<p>
    Welcome <H1> {{username}} </H1>
</p>
<ul>
%for fruit in fruits:
    <li> <b>{{fruit}}</b></li>
%end

</ul>
<p>
<form action="/favorite_fruit" method="POST">
What is your favorite fruit?
    <input type ="text" name="fruit" size="40" value=""> <br>
    <input type="submit" value="Submit">


</form>

</p>

</body>
</html>