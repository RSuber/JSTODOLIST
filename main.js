$(document).ready(function(){
  Todo.init();
})
var Todo = {
  url: 'http://tiny-tiny.herokuapp.com/collections/loganstodossss',
  log: [],
  init: function() {
    Todo.styling();
    Todo.events();
  },
  styling: function() {
Todo.getlogan();
  },
  events: function() {
    $('form').on("submit", function(event) {
      event.preventDefault();
    var todo = $(this).children('input').val();
    console.log(todo);
    $('.output ul').append(`<li>${todo}</li>`,`<button class="delete">${"delete"}</button>`)
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
        Todo.log.push(data);
        data.forEach(function(todo) {
        $('.output ul').append(`<li>${todo.todo}</li>`,`<button class="delete">${"delete"}</button>`);
        })
      },
      error: function(err){
        console.log("uhoh",err);
      }
    })
}
}
//This deletes the first item in the list from both the data and the array after you refresh.
//I have no idea where I am supposed to put this function to get it to work. I put it in my
//console and it works after I load the page but thats it.
  $('.delete').on('click',function(event){
    $.ajax({
      url:Todo.url + "/" +$(Todo.log[0]).attr('_id'),
      method: 'DELETE',
      success: function(data){
        console.log("deleted",data);
        console.log($(this));
      },
      error: function(err){
        console.log('uhoh',err);
        console.log($(this));
      }
    })
  })
