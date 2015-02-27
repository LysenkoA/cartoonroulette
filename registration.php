<!doctype html>
<html>
    <head>
        <meta charset="utf-8">
        <!--[if lt IE 9]><script src="http://html5shiv.googlecode.com/svn/trunk/html5.js"></script><![endif]-->
	<!--[if lt IE 9]>
    <script src="http://css3-mediaqueries-js.googlecode.com/svn/trunk/css3-mediaqueries.js"></script>
<![endif]-->
        <title>Admin panel</title>
        <link href="assets/css/general.css" rel="stylesheet">
        <link rel="stylesheet" href="assets/css/Reg-style.css">
        <link rel="stylesheet" href="assets/css/header-style.css">
        <link rel="stylesheet" href="assets/css/footer-style.css">
        <link rel="stylesheet" href="assets/lib/font-awesome.css">
    </head>
    <body>
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
            
                <div class="registration-form block-decoration">
                    <h2 title="registration">Registration form:</h2>
                    <p>
                        <label for="user-name">Name: </label>
                        <input type="text" id="user-name" name="name" required>
                    </p>
                    <p>
                        <label for="user-pass">Password: </label>
                        <input type="password" id="user-pass" name="pass" required>
                    </p>
                    <p>
                        <label for="user-email">E-mail: </label>
                        <input type="email" id="user-email" name="email" required>
                    </p>
                    <span id="reg-submit">Registration</span>
                </div>
            
            </main><!-- .content -->   
        
        
        </div><!-- .wrapper -->

        <footer class="footer">
            &copy; Cartoon roulette <span><a href="">GitHub</a></span>
        </footer><!-- .footer -->

<!--<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>-->
<script src="assets/lib/jquery-2.1.3.min.js"></script>
<script type="text/javascript" src="assets/js/main.js"></script>
<script src="assets/js/reg-script.js"></script>
<script type="text/javascript" src="assets/js/help.js"></script>
</body>
</html>