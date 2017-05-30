<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8" />
	<!--[if lt IE 9]><script src="http://html5shiv.googlecode.com/svn/trunk/html5.js"></script><![endif]-->
	<!--[if lt IE 9]>
    <script src="http://css3-mediaqueries-js.googlecode.com/svn/trunk/css3-mediaqueries.js"></script>
<![endif]-->
	<title>Cartoon roulette</title>
	<meta name="keywords" content="" />
	<meta name="description" content="" />
	<link rel="stylesheet" href="assets/css/Main-style.css">
	<link rel="stylesheet" href="assets/css/header-style.css">
	<link rel="stylesheet" href="assets/css/footer-style.css">
	<link rel="stylesheet" href="assets/css/general.css">
	<link rel="stylesheet" href="assets/lib/font-awesome.css">
	<link rel="stylesheet" href="assets/css/media.css">
</head>

<body>

<div id="page-preloader"><span class="spinner"></span></div>

<div class="wrapper">

	<!-- comment ... ... ...-->

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
        <div class="row">
            
            <div class="help-left">
                <img class="help-img" src="assets/img/help.png" alt="">
            </div>
            
            <div class="choice-menu block-decoration">
                <h2>Choose options:</h2>
                <div class="options">

                    <div class="parameter">
                        <span class="switch button-red" id="agefilt" title="Age of children"><i class="fa fa-angle-double-down"></i></span>
                        <span class='formh'>Age of children</span>
                        <div id="agefilt-after">
                            <input type="radio" name="age" value="1" id="age1" />
                                <label for="age1">1</label>
                            <input type="radio" name="age" value="2" id="age2" />
                                <label for="age2">2</label>
                            <input type="radio" name="age" value="3" id="age3" />
                                <label for="age3">3</label>
                            <input type="radio" name="age" value="4" id="age4" />
                                <label  for="age4">4</label>
                            <input type="radio" name="age" value="5" id="age5" />
                                <label  for="age5">5</label>
                        </div>
                    </div>

                    <div class="parameter">
                        <span class="switch button-red" id="genfilt" title="Sex of the child"><i class="fa fa-angle-double-down"></i></span>
                       <span class='formh'>Gender of the child</span> <br />
                        <div id="genfilt-after">
                            <input type="radio" name="gen" value="m" id="gen1" />
                                <label for="gen1">boy<!--<img src="assets/img/boy.png" />--></label>
                            <input type="radio" name="gen" value="w" id="gen2" />
                                <label for="gen2">girl<!--<img src="assets/img/girl.png" />--></label>
                        </div>                    
                    </div>

                    <div class="parameter">
                        <span class="switch button-red" id="counfilt" title="Country of cartoon"><i class="fa fa-angle-double-down"></i></span>
                        <span class='formh'>Country of cartoon</span>
                        <div id="counfilt-after">
                            <input type="radio" name="count" value="rus" id="count1" />
                                <label for="count1"><img src="assets/img/ru.jpg"><span class="after-label">Russia (USSR)</span></label> 
                            <input type="radio" name="count" value="usa" id="count2" />
                                <label for="count2"><img src="assets/img/usa.jpg"><span class="after-label">USA</span></label>
                            <input type="radio" name="count" value="jap" id="count3" />
                                <label for="count3"><img src="assets/img/jap.gif"><span class="after-label">Japan</span></label>
                        </div>                    
                    </div>

                    <div class="parameter">
                        <span class="switch button-red" id="langfilt" title="Language cartoon"><i class="fa fa-angle-double-down"></i></span>
                        <span class='formh'>Language cartoon</span>
                        <div id="langfilt-after">
                            <input type="radio" name="lan" value="ru" id="lan1" />
                                <label for="lan1">Russian</label>
                            <input type="radio" name="lan" value="en" id="lan2" />
                                <label for="lan2">English</label>
                        </div>                    
                    </div>

                </div>

                <div class="sub-buttons">
                    <span class="but-submit">Select</span>
                    <span class="separator-but">or</span>
                    <span class="but-favorite">&#9733;</span>
                </div>
            </div>
            
            <div class="help-right"><img class="help-img" src="assets/img/help2.png" alt=""></div>

            <div class="cartoon-list block-decoration">
                <h2>Click to play</h2>
                
                <div class="result-list">
                    <ul class="list-cartoons"></ul>
                </div>
            </div>
        
        </div>

        <div class="showing block-decoration">
            <div class="video">
               <iframe class="play-video" src="" frameborder="0" allowfullscreen></iframe>
               <div class="control-button">
                   <span class="prev-film"><i class="fa fa-fast-backward"></i> Prev</span>
                   <span class="next-film">Next <i class="fa fa-fast-forward"></i></span>
                    <span class="close-film">Close <i class="fa fa-times"></i></span>
               </div>            
            </div>

            <div class="info">
                <h2 class="header-info"></h2>
                <div class="details">
                    <p class="category">
                        <span class="categories-title">Age:</span>
                        <span id="age-info"></span>
                    </p>
                    <p class="category">
                        <span class="categories-title">Language:</span>
                        <span id="lang-info"></span>
                    </p>
                    <p class="category">
                        <span class="categories-title">Country:</span>
                        <span id="country-info"></span>
                    </p>
                    <!--<p class="category" id="src-info"><span class="categories-title">Channel:</span></p>-->
                </div>
            </div>

        </div> 
	</main><!-- .content -->   
        
        
</div><!-- .wrapper -->

<footer class="footer">
	&copy; Cartoon roulette <span><a href="https://github.com/LysenkoA/cartoonroulette">GitHub</a></span>
</footer><!-- .footer -->

<script src="assets/lib/jquery-2.1.3.min.js"></script>
<script type="text/javascript" src="assets/js/main.js"></script>
</body>
</html>