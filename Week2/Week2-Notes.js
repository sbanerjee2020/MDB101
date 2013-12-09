/**
 * Created with PyCharm.
 * User: somnathbanerjee
 * Date: 12/8/13
 * Time: 9:21 AM
 * To change this template use File | Settings | File Templates.
 */

obj = {"a" : 1,  "b" : "hello"   , "c" : ["apples", "tomatoes"]}

/**
 *
 > show dbs
 > use somnathdb
 > show collections

 > obj = {"a" : 1,  "b" : "hello"   , "c" : ["apples", "tomatoes"]}
{ "a" : 1, "b" : "hello", "c" : [ "apples", "tomatoes" ] }

 MongoDB uses a BSON  to store data.  This can be found in http://www.bsonspec.org
 BSON stores the basic data types of JSON:
        1.  double precision floating point
        2.  UTF8 strings
        3.  embedded documents
        4.  embedded arrays  (These are documents whose keys can be integers
        5.  Boolean values false and true
        6.  null

 Additionally:
        A.  Binary Data Type
        B.  ObjectID
        C.  UTC DateTime  (Time since Jan 1 1970)
        D.  32 bit integer
        E.  64 bit integer
        F.  Regular Expression in Query Protocol
        G.  TimeStamp

> NumberInt(1)
NumberInt(1)
> NumberInt(4)
NumberInt(4)
> NumberLong(1) + NumberLong(4)

 > new Date()
ISODate("2013-12-08T17:41:58.244Z")

 > obj = {"a" : 1,  "b" : (new Date() ) , "c" : NumberLong(5)}
{ "a" : 1, "b" : ISODate("2013-12-08T17:43:20.732Z"), "c" : NumberLong(5) }
> obj.a
1
> obj.b
ISODate("2013-12-08T17:43:20.732Z")
> obj.c
NumberLong(5)

 **/

/**
 * Establish a binding between a variable and a document

doc = {"name" : "Somnath",  "age" : 49,  "profession" : "Software Engineering" }

 *  Getting a handle on the current database  use db
> db
somnathdb

 *  Documents live in collections  which are properties of a database
 *  Inserting a document in a collection
> db.people.insert(doc)

 *  Finding documents inside a collection
> db.people.find()
{ "_id" : ObjectId("52a4b2a539baea35bae300a3"), "name" : "Somnath", "age" : 49, "profession" : "Software Engineering" }

 *  Insert a document into the fruit collection with the attributes of "name" being "apple", "color" being "red",
 *  and "shape" being "round".  Use the "insert" method.
 *
 > db.fruit.insert( { "name" : "apple", "color" : "red", "shape" : "round"  } )
 > db.fruit.insert ( { 'name' : 'apple', 'color' : 'red', 'shape' : 'round'  } )

  */


/**
 * FindOne has two arguments - the equivalent of Where clause and the list of properties to be displayed
 * db.people.findOne({"name" : "Somnath"} , {"name":  1, "profession" : 1, "_id" : 0})

 > db.people.findOne({"name" : "Somnath"} , {"name":  1, "profession" : 1, "_id" : 0})
{ "name" : "Somnath", "profession" : "Software Engineering" }

> db.people.findOne({"name" : "Somnath"} , {"name":  1, "age" : 1, "_id" : 0})
{ "name" : "Somnath", "age" : 49 }

 */

/**
 *  Creating a Sample Data Set
 */

for (i=0; i < 1000; i++) {
    names = ["exam", "essay", "quiz"];
    for (j=0; j < 3; j++) {
        db.scores.insert(
            {
                "student" : i ,
                "type" : names[j],
                "score" : Math.round(Math.random()* 100)
            }
        )
    }
}
/**
 db.scores.count()

 Supposing a scores collection similar to the one presented, how would you find all documents
 with an essay score equal to 50 and only retrieve the student field?

 db.scores.find({"score" : 50, "type" : "essay"}, {"student" : true, "_id" : false})

 */


/**
 * Inequality comparison

    db.scores.find ( {score : {$gt : 95 } } )
    db.scores.find ( {score : {$gt : 95 }, type : "essay" } )

    db.scores.find ( {score : {$gt : 95, $lte : 97 }, type : "essay" } )

    db.people.insert( {"name" : "Alice"})
    db.people.insert( {"name" : "Bob"})
    db.people.insert( {"name" : "Charlie"})
    db.people.insert( {"name" : "Dave"})
    db.people.insert( {"name" : "Edgar"})
    db.people.insert( {"name" : "Fred"})
    db.people.insert( {"name" :  42})

 * Find all people whose name field is lexicographically less than D
    db.people.find({"name" : {$lt : "D" }} )
 */

/**
 * Regex,  $exists and $type

    db.people.find({"profession" : {$exists : 1} } )

    db.people.find({"name" : {$type : 2} } )

    db.people.find({"name" : {$type : 1} } )

 *  Find all people whose name has an a
    db.people.find({"name" : {$regex : "a"} } )

 *  Find all people whose name has a capital A
    db.people.find({"name" : {$regex : "A"} } )

 *  Find all people whose name ends with an e
    db.people.find({"name" : {$regex : "e$"} } )

 *  Find all people whose name starts with an A
    db.people.find({"name" : {$regex : "^A"} } )

 */

/**
 * Combining Multiple Queries  OR:

 *  Find all those people whose name ends with an e or who has an age field
 *  or:  is a prefix operator.  It has an array of documents formed by queries.  The final answer is a union of all queries

    db.people.find({$or : [ {name : {$regex : "e$"}}  , {age : {$exists : true}}] })

 *  How would you find all documents in the scores collection where the score is less than 1 or greater than 99?

    db.scores.find({$or : [ {score : {$lt : 1} },   {score : {$gt : 99}}] })
 */


/**
 * Combining Multiple Queries  AND:

 *  Find all those people whose name is greater than C and has the letter a somewhere

    db.people.find({$and : [ {name : {$gt : "C"}}  , {name : {$regex : "a"}}] })

 *  The same could be written in a much more simpler fashion without and:

    db.people.find({name :  { $gt : "C",  $regex : "a"}   } )
 */

/**
 * $all:

 *  Finds all documents for which favorites is a superset of ["pretzels", "beer"]

    db.accounts.find({favorites : {$all : ["pretzels", "beer"] }})

  * $in:
    db.people.find({name :  { $in : ["Somnath", "Alice"] }})
 */


/**
 * Write a query that retrieves exam documents, sorted by score in descending order, skipping the first 50
 * and showing only the next 20.

    db.scores.find({type : "exam"}).sort({score: -1}).skip(50).limit(20)

 * How would you count the documents in the scores collection where the type was "essay" and the score was greater than 90?

    db.scores.count({ type : "essay", score : { $gt : 90 } } )
 */

/**
 * Update

  Let's say you had a collection with the following document in it:
        { "_id" : "Texas", "population" : 2500000, "land_locked" : 1 }
    and you issued the query:

    db.foo.update({_id:"Texas"},{population:30000000})

    { "_id" : "Texas", "population" : 30000000 }
 */

/**
 * Update  (Adding new fields and increments)

    db.people.update({"name" : "Alice"} , {$set : {age : 30}})
    db.people.update({"name" : "Alice"} , {$set : {age : 30}})
    db.people.find({"name" : "Alice"} )
        { "_id" : ObjectId("52a4fb5c39baea35bae31814"), "age" : 30, "name" : "Alice" }

    db.people.update({"name" : "Alice"} , {$set : {age : 31}})
    db.people.find({"name" : "Alice"} )
        { "_id" : ObjectId("52a4fb5c39baea35bae31814"), "age" : 31, "name" : "Alice" }

    db.people.update({"name" : "Alice"} , {$inc : {age : 3}})
    db.people.find({"name" : "Alice"} )
    { "_id" : ObjectId("52a4fb5c39baea35bae31814"), "age" : 34, "name" : "Alice" }
>
 */

/**
 * Update  (Removing an existing field)

    > db.people.find({"name" : "Somnath"} )
        { "_id" : ObjectId("52a4b2a539baea35bae300a3"), "name" : "Somnath", "age" : 49, "profession" : "Software Engineering" }
    > db.people.update({"name" : "Somnath"} , {$unset : {"profession" : 1} })
    > db.people.find({"name" : "Somnath"} )
    { "_id" : ObjectId("52a4b2a539baea35bae300a3"), "age" : 49, "name" : "Somnath" }
>
 */


/**
 * Update  (Removing an existing field)

    db.arrays.insert({"_id" : 0, a : [1 , 2, 3 , 4] })
    db.arrays.findOne()
      { "_id" : 0, "a" : [ 1, 2, 3, 4 ] }

    db.arrays.update({"_id" : 0} , { $set : { "a.2" : 5 } } );
    db.arrays.findOne()
        { "_id" : 0, "a" : [ 1, 2, 5, 4 ] }

    db.arrays.update({"_id" : 0} , { $push : { a : 6 } } );
    db.arrays.update({"_id" : 0} , { $push : { a : 6 } } );
    db.arrays.findOne()
        { "_id" : 0, "a" : [ 1, 2, 5, 4, 6, 6 ] }

    db.arrays.update({"_id" : 0} , { $pop : { a : 1 } } );
    db.arrays.findOne()
        { "_id" : 0, "a" : [ 1, 2, 5, 4, 6 ] }

    db.arrays.update({"_id" : 0} , { $pop : { a : -1 } } );
    db.arrays.findOne()
        { "_id" : 0, "a" : [ 2, 5, 4, 6 ] }

    db.arrays.update({"_id" : 0} , { $push : { a : [7, 8 , 9] } } );
    db.arrays.findOne()
        {    "_id" : 0, "a" : [ 2, 5, 4, 6, [ 7, 8, 9 ] ] }

    db.arrays.update({"_id" : 0} , { $pull : { a : 5 } } );
    db.arrays.findOne()
        { "_id" : 0, "a" : [ 2, 4, 6, [ 7, 8, 9 ] ] }

    db.arrays.update({"_id" : 0} , { $pop : { a : 1 } } );
    db.arrays.findOne()
        { "_id" : 0, "a" : [ 2, 4, 6 ] }

    db.arrays.update({"_id" : 0} , { $pushAll : { a : [7, 8 , 9] } } );
    db.arrays.findOne()
        { "_id" : 0, "a" : [ 2, 4, 6, 7, 8, 9 ] }

    db.arrays.update({"_id" : 0} , { $pullAll : { a : [2, 4 , 9] } } );
    db.arrays.findOne()
        { "_id" : 0, "a" : [ 6, 7, 8 ] }

    db.arrays.update({"_id" : 0} , { $addToSet : { a : 2 } } )
    db.arrays.findOne()
        { "_id" : 0, "a" : [ 6, 7, 8, 2 ] }

    db.arrays.update({"_id" : 0} , { $addToSet : { a : 2 } } )
    db.arrays.findOne()
        { "_id" : 0, "a" : [ 6, 7, 8, 2 ] }
 */


/**
 * Upsert  (Insert and Update)


 > db.people.update({"name" : "George"}, {$set : {age : 77}})
> db.people.find()
{ "_id" : ObjectId("52a4b2a539baea35bae300a3"), "age" : 49, "name" : "Somnath" }
{ "_id" : ObjectId("52a4fba439baea35bae31815"), "name" : "Bob" }
{ "_id" : ObjectId("52a4fba439baea35bae31816"), "name" : "Charlie" }
{ "_id" : ObjectId("52a4fba439baea35bae31817"), "name" : "Dave" }
{ "_id" : ObjectId("52a4fba439baea35bae31818"), "name" : "Edgar" }
{ "_id" : ObjectId("52a4fba539baea35bae31819"), "name" : "Fred" }
{ "_id" : ObjectId("52a4fd9839baea35bae3181a"), "name" : 42 }
{ "_id" : ObjectId("52a4fb5c39baea35bae31814"), "age" : 34, "name" : "Alice" }


> db.people.update({"name" : "George"}, {$set : {age : 77}}, {upsert: 1})
> db.people.find()
{ "_id" : ObjectId("52a4b2a539baea35bae300a3"), "age" : 49, "name" : "Somnath" }
{ "_id" : ObjectId("52a4fba439baea35bae31815"), "name" : "Bob" }
{ "_id" : ObjectId("52a4fba439baea35bae31816"), "name" : "Charlie" }
{ "_id" : ObjectId("52a4fba439baea35bae31817"), "name" : "Dave" }
{ "_id" : ObjectId("52a4fba439baea35bae31818"), "name" : "Edgar" }
{ "_id" : ObjectId("52a4fba539baea35bae31819"), "name" : "Fred" }
{ "_id" : ObjectId("52a4fd9839baea35bae3181a"), "name" : 42 }
{ "_id" : ObjectId("52a4fb5c39baea35bae31814"), "age" : 34, "name" : "Alice" }
{ "_id" : ObjectId("52a5346842ce119acc1b1b4c"), "age" : 77, "name" : "George" }

 */

/**
 * Update  (Multi)
> db.people.update({} , {$set : {"title" : "Citizen"}} , {multi : 1} )
> db.people.find()
{ "_id" : ObjectId("52a4b2a539baea35bae300a3"), "age" : 49, "name" : "Somnath", "title" : "Citizen" }
{ "_id" : ObjectId("52a4fba439baea35bae31815"), "name" : "Bob", "title" : "Citizen" }
{ "_id" : ObjectId("52a4fba439baea35bae31816"), "name" : "Charlie", "title" : "Citizen" }
{ "_id" : ObjectId("52a4fba439baea35bae31817"), "name" : "Dave", "title" : "Citizen" }
{ "_id" : ObjectId("52a4fba439baea35bae31818"), "name" : "Edgar", "title" : "Citizen" }
{ "_id" : ObjectId("52a4fba539baea35bae31819"), "name" : "Fred", "title" : "Citizen" }
{ "_id" : ObjectId("52a4fd9839baea35bae3181a"), "name" : 42, "title" : "Citizen" }
{ "_id" : ObjectId("52a4fb5c39baea35bae31814"), "age" : 34, "name" : "Alice", "title" : "Citizen" }
{ "_id" : ObjectId("52a5346842ce119acc1b1b4c"), "age" : 77, "name" : "George", "title" : "Citizen" }

 */