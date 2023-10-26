Project: <h1> Sneaker Store Web App </h1>

<table border="2">
        <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Note</th>
        </tr>
        <tr>
            <td>21110758</td>
            <td>Le Xuan Cuong</td>
            <td>Leader</td>
        </tr>
        <tr>
            <td>21110785</td>
            <td>Mai Nguyen Nhat Nam</td>
            <td>Member</td>
        </tr>
        <tr>
            <td>21110092</td>
            <td>Bui Quoc Thong</td>
            <td>Member</td>
        </tr>
        <tr>
            <td>21110019</td>
            <td>Tran Gia Huy</td>
            <td>Member</td>
        </tr>
</table>
<br>
<h2>Test: </h2>
<ul>
<li>
<strong>Client</strong>
<p>cd to client directory, then run: <em>npm run dev</em></p>
</li>
<li>
<strong>Server</strong>
<ol>
<li>Create Test database using the following statements: </br>
<code>
drop database if exists `uni_wp_sneakerdb`;
use uni_wp_sneakerdb;
drop table if exists `Test_user`;
create table Test_user ( 
	id int auto_increment primary key  ,
    name varchar(255)
    );
    
insert into Test_user (name) values ("cuong"), ("cuong1"), ("cuong2");
</code>
</li>
<li>After created the database, run the project server and access /test  ( you will see 1: cuong )</li>
</ol>
</li>