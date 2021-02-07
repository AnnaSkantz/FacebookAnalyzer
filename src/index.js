
let profile = {
name: null,
};
let postsArray = new Array();
let dateArray = new Array();
let monthCountArray = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
Chart.defaults.global.legend.display = false;

window.fbAsyncInit = function () {
FB.init({
    appId: "252432313037803",
    xfbml: true,
    version: "v9.0",
});
FB.AppEvents.logPageView();
};

(function (d, s, id) {
var js,
    fjs = d.getElementsByTagName(s)[0];
if (d.getElementById(id)) {
    return;
}
js = d.createElement(s);
js.id = id;
js.src = "https://connect.facebook.net/en_US/sdk.js";
fjs.parentNode.insertBefore(js, fjs);
})(document, "script", "facebook-jssdk");

function statusChangeCallback(response) {
    if (response.status === "connected") {
        console.log("Logged in and authenticated");
        //getUser();
        getPosts();
        initChartOfMonths();
        initChartOfClock();
    } else {
        console.log("not authenticated");
    }
}

function checkLoginState() {
    FB.getLoginStatus(function (response) {
        statusChangeCallback(response);
    });
}

function getPosts() {
/*FB.api("/me/posts", function (posts) {
    posts.data.forEach((post) => {
    postsArray.push(post);
    });*/
updateData();
//});
}

function updateData() {
    var newCount;
    var monthString;
    var month;
    postsArray.forEach((post) =>
        FB.api(
        `/${post["id"]}`,
        { fields: "backdated_time, created_time" },
        function (post) {
            var date = post["backdated_time"]
            ? post["backdated_time"]
            : post["created_time"];
            dateArray.push(date);

            if (date.match("2020")) {
            monthString =
                date.slice(5, 6) === 0 ? date.slice(6, 7) : date.slice(5, 7);

            month = parseInt(monthString);
            month--;
            newCount = monthCountArray[month] + 1;

            monthCountArray.splice(month, 1, newCount); //Add the new number of posts for this month
            }
        }
        )
    );

    console.log();
    console.log(dateArray);
    console.log(monthCountArray);
}

function getUser() {
    FB.api("/me", "GET", function (response) {
        initUser(response);
    });
}

function initUser(user) {
    profile.name = user["name"];
    document.getElementById("user").innerHTML = `<h2>${profile.name}</h2>`;
}

//~~~CHARTS~~~
function initChartOfMonths() {
    var ctx = document.getElementById("myChartOfMonths").getContext("2d");
    var myChart = new Chart(ctx, {
        type: "bar",
        data: {
        labels: [
            "January",
            "Febuary",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
        ],
        datasets: [
            {
            barPercentage: 1,
            barThickness: 40,
            maxBarThickness: 40,
            minBarLength: 2,
            data: monthCountArray,
            backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(255, 206, 86, 0.2)",
                "rgba(75, 192, 192, 0.2)",
                "rgba(153, 102, 255, 0.2)",
                "rgba(255, 159, 64, 0.2)",
                "rgba(255, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(255, 206, 86, 0.2)",
                "rgba(75, 192, 192, 0.2)",
                "rgba(153, 102, 255, 0.2)",
                "rgba(255, 159, 64, 0.2)",
            ],
            borderColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(153, 102, 255, 1)",
                "rgba(255, 159, 64, 1)",
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(153, 102, 255, 1)",
                "rgba(255, 159, 64, 1)",
            ],
            borderWidth: 1,
            },
        ],
        },
        options: {
        title: {
            display: true,
            text: "Your facebook posts over the last year",
            fontSize: "30",
            fontStyle: "bold",
            fontFamily: "Tahoma",
            fontColor: "#3b5998",
        },
        scales: {
            yAxes: [
            {
                ticks: {
                beginAtZero: true,
                },
            },
            ],
        },
        },
    });
}

function initChartOfClock(hrs1, hrs2) {
    var ctx = document.getElementById("myChartOfTime").getContext("2d");
    var myChart = new Chart(ctx, {
        type: "polarArea",
        data: {
        labels: [],
        datasets: [
            {
            data: [1, 1, 1, 1, 1, 1, 10, 1, 1, , 1, 1],
            backgroundColor: [
                //"#4BC0C0",
                "#3b5998",
                "#3b5998",
                "#3b5998",
                "#3b5998",
                "#3b5998",
                "#3b5998",
                "#3b5998",
                "#3b5998",
                "#3b5998",
                "#3b5998",
                "#3b5998",
                "#3b5998",
            ],
            borderColor: "white",
            borderWidth: 3,
            label: "My dataset", // for legend
            },
        ],
        },
        options: {
        legend: {
            display: false,
        },
        scale: {
            display: false,
        },
        hoverBackgroundColor: ["#4BC0C0"],
        title: {
            display: true,
            text: "You are the most active between" + hrs1 + "-" + hrs2,
            fontSize: "30",
            fontStyle: "bold",
            fontFamily: "Tahoma",
            fontColor: "#3b5998",
        },
        },
    });
}
