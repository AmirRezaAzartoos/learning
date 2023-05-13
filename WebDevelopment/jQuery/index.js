$("h1").addClass("big-title");
$("button").html("<em>Click me</em>")
console.log($("img").attr("src"))
$("a").attr("href", "https://www.bing.com")
$("button").click(function() {
    $("h1").css("color", "purple")
})
$("input").keypress(function(event) {
    $("h1").text(event.key)
})
$("h1").on("mouseover", function(){
    $("h1").css("color", "purple")
})
$("h1").on("mouseleave", function(){
    $("h1").css("color", "yellow")
})
//https://developer.mozilla.org/en-US/docs/Web/Events
$("h1").before("<button>before</button>")
$("h1").after("<button>after</button>")
$("h1").prepend("<button>prepend</button>")
$("h1").append("<button>append</button>")
// $("h1").remove();
$("button").on("click", function(){
    $("h1").hide()
    // $("h1").show()
    // $("h1").toggle()
    // $("h1").fadeout()
    // $("h1").fadein()
    // $("h1").fadetoggle()
    // $("h1").slideup()
    // $("h1").slidedown()
    // $("h1").slidetoggle()
    // $("h1").animate({opacity: 0.5})
    // $("h1").animate({margin/*must be numeric */: 10})
    // $("h1").slideup().slidedown().animate({opacity: 0.5})
    // https://api.jquery.com/category/effects/
})