$(document).ready(function(){
  Todo.init();
})
var Todo = {
  url: 'http://tiny-tiny.herokuapp.com/collections/loganstodosss',
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
    $('.output ul').append(`<li>${todo.todo}<button class="delete">${"delete"}</button></li>`)
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
        $('.output ul').append(`<li>${todo.todo}  <button class="delete">${"delete"}</button></li>`);
        })
      },
      error: function(err){
        console.log("uhoh",err);
      }
    })

}
}
// I have no idea what to do with this code. It will not run no matter where I put it. 
  $('.delete').on('click',function(event){
    $.ajax({
      url:Todo.url + "/" +$(Todo.log[0]).attr('_id'),
      method: 'DELETE',
      success: function(data){
        console.log("deleted",data);
      },
      error: function(err){
        (this).remove();
        console.log('uhoh',err);
      }
    })
  })
