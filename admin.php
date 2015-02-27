<?php
require ('system/checkpass.php');
?>

<!doctype html>
<html>
    <head>
        <meta charset="utf-8">
        <!--[if lt IE 9]><script src="http://html5shiv.googlecode.com/svn/trunk/html5.js"></script><![endif]-->
	<!--[if lt IE 9]>
    <script src="http://css3-mediaqueries-js.googlecode.com/svn/trunk/css3-mediaqueries.js"></script>
<![endif]-->
        <title>Admin panel</title>
        <link rel="stylesheet" href="assets/css/preload.css">
        <link rel="stylesheet" href="assets/css/general.css">
        <link rel="stylesheet" href="assets/css/Admin-style.css">
        <link rel="stylesheet" href="assets/css/header-style.css">
        <link rel="stylesheet" href="assets/css/footer-style.css">
        <link rel="stylesheet" href="assets/lib/font-awesome.css">
        <link rel="stylesheet" href="assets/css/media.css">
    </head>
    <body>
       
       <div id="page-preloader"><span class="spinner"></span></div>
       
        <div class="wrapper">

            <header class="header block-decoration">
                <div class="header-title">
                    <a href="index.php">
                        <span class="first-word">Cartoon</span>
                        <span class="second-word">roulette</span>
                    </a>
                </div>
                <div class="authorization">
        <!--            <a href="admin.php">Admin</a>-->
                    <div id="login">
                        Sign In <span class="fa fa-sign-in fa-2x"></span>
                    </div>
                </div>
            </header><!-- .header-->

            <main class="content">
            
                <div class="content-admin block-decoration">
                    <h2>Admin panel</h2>
                    
                    <div class="categories">
                        <div class="cartoon-cat active-cat">
                            <span id="but-cartoon-cat">Manage cartoons</span>
                        </div>
                        <div class="users-cat">
                            <span id="but-users-cat">Manage users</span>
                        </div>
                    </div>
                    
                    <div class="add-item">
                        <span id="add-button" class="add-button-decoration">Add new cartoon <i class="fa fa-plus"></i></span>
                    </div>
                    
                    <div class="add-item-panel">
                        <p>
                            <span class="add-new-lable">Enter the title:</span> 
                            <input type="text" name="title-new-item" placeholder="Title">
                        </p>
                        <p>
                            <span class="add-new-lable">Select the age:</span>
                            <select name="age-new-item" id="">
                                <option value="default">Age</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </select>
                        </p>
                        <p><span class="add-new-lable">Select gender:</span>
                            <select name="gender-new-item" id="">
                                <option value="default">Gender</option>
                                <option value="m">boy</option>
                                <option value="w">girl</option>
                            </select>
                        </p>
                        <p>
                            <span class="add-new-lable">Select country:</span>
                            <select name="country-new-item" id="">
                                <option value="default">Country</option>
                                <option value="rus">Russia (USSR)</option>
                                <option value="usa">USA</option>
                                <option value="jap">Japan</option>
                            </select>
                        </p>
                        <p>
                            <span class="add-new-lable">Select language:</span>
                            <select name="language-new-item" id="">
                                <option value="default">Language</option>
                                <option value="ru">Russian</option>
                                <option value="en">English</option>
                            </select>
                        </p>
                        <p>
                            <span class="add-new-lable">Enter the link:</span>
                            <input type="text" name="link-new-item" placeholder="Link">
                        </p>
                        <div>
                            <span id="submit-add-item">
                               Add cartoon <i class="fa fa-check fa-2x"></i>
                            </span>
                            <span id="cancel-add-item">
                                Back <i class="fa fa-reply fa-2x"></i>
                            </span>
                        </div>
                    </div>
                    
                    <table class="admin-table table-style">
                        <thead class="table-style-head">
                            <tr>
                                <th>Title</th>
                                <th>Age</th>
                                <th>Gender</th>
                                <th>Country</th>
                                <th>Language</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody class="admin-table-body table-style-body"> 
                        </tbody>
                    </table>
                    
                    <div class="admin-users">
                        <div class="add-new-user">
                            <span class="but-add-user add-button-decoration">Add new user <i class="fa fa-user-plus"></i></span>
                        </div>
                        <div class="users-list">
                            <table class="users-list-table table-style">
                                <thead class="user-list-table-head table-style-head">
                                    <tr>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Role</th>
                                        <th></th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody class="users-list-table-body table-style-body">
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            
            </main><!-- .content -->   
        
        
        </div><!-- .wrapper -->

        <footer class="footer">
            &copy; Cartoon roulette <span><a href="">GitHub</a></span>
        </footer><!-- .footer -->

<!--<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>-->
<script src="assets/lib/jquery-2.1.3.min.js"></script>
<script type="text/javascript" src="assets/js/main.js"></script>
<script src="assets/js/admin-cartoons-script.js"></script>
<script src="assets/js/admin-users-script.js"></script>
</body>
</html>