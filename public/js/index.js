var register_form = `<div class="register_form">
<form action="/users" method="post">
  <input type="text" id="email" name="email" placeholder="Email" autofocus required>
  <input type="password" name="password" placeholder="Password" required>
  <button type="submit" id="submit">Register</button>
</form>
</div>`

var login_form = `<div class="login_form">
<form action="/login" method="POST">
  <input type="text" id="email" name="email" placeholder="Email" autofocus required>
  <input type="password" name="password" placeholder="Password" required>
  <button type="submit" id="submit">Login</button>
</form>
</div>`
$(document).ready(function () {

    $('#register').click(function () {
        if ($('.register_form').length == 0) {
            $('.register_login').append(register_form);
            if ($('.register_form')) {
                $('.login_form').remove();
            }
        }
    });

    $('#login').click(function () {
        if ($('.login_form').length == 0) {
            $('.register_login').append(login_form);
            if ($('.register_form')) {
                $('.register_form').remove();
            }
        }
    });
});