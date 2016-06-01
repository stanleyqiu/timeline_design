var express = require('express');
var app = express();

app.use(express.static('/Users/stanley_q/git_project/timeline_design/static/hs'));
app.listen(3002);
