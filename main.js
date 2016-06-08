$(document).ready(function(){
  Todo.init();
})

var Todo = {
  url: 'http://tiny-tiny.herokuapp.com/collections/loganstodos',
  log: [],
  init: function() {
    Todo.styling();
    Todo.events();
    Todo.getlogan();
    Todo.applydeletebar();
  },
  styling: function() {

  },
  events: function() {
    $('form').on("submit", function(event) {
      event.preventDefault();
    var todo = $(this).children('input').val();
    console.log(todo);
    $('.output ul').append(`<li>${todo}</li>`)
    $.ajax({
      url:Todo.url,
      method:'POST',
      data: {todo: todo},
      success: function(data){
        console.log("wew",data);
      },
      error: function(err){
        console.log("idiot",err);
      }
    })
    })
  },
getlogan: function(){
  $.ajax({
      url:Todo.url,
      method:'get',
        success: function(data){
        console.log("nice",data);
        data.forEach(function(todo) {
        $('.output ul').append(`<li>${todo.todo}</li>`)
        })
      },
      error: function(err){
        console.log("uhoh",err);
      }
    })

},
delete: function(Liid){
  $('button p.clear').on('click',function(event){
    $.ajax({
      url:'http://tiny-tiny.herokuapp.com/collections/loganstodoss',
      method: 'DELETE',
      success: function(data){
        console.log("deleted",data);
      },
      error: function(err){
        console.log('uhoh',err);
      }
    })
  })
},
applydeletebar: function(){
  $('ul li').append(`<button>${d}</button>`)
}
}
