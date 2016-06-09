$(document).ready(function() {
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
            $('.output ul').append(`<li>${todo}</li>`, `<button class="delete">${"delete"}</button>`)
            $.ajax({
                url: Todo.url,
                method: 'POST',
                data: {
                    todo: todo
                },
                success: function(data) {
                    console.log("wew", data);
                },
                error: function(err) {
                    console.log("idiot", err);
                }
            })
        })
        $('.output').on('click','.delete', function(event) {
      event.preventDefault();
      todoiD = $(this).parent().data('id');
      Todo.delete(todoiD);
      $('.output li')[0].remove();
      $('button.delete')[0].remove();
    })

    },
    getlogan: function() {
        $.ajax({
            url: Todo.url,
            method: 'get',
            success: function(data) {
                console.log("nice", data);
                Todo.log.push(data);
                data.forEach(function(todo) {
                    $('.output ul').append(`<li data-id="${"pickle"}">${todo.todo}</li>`, `<button class="delete">${"delete"}</button>`);
                })
            },
            error: function(err) {
                console.log("uhoh", err);
            }
        })
    },
    delete: function(iD) {
        $.ajax({
            url: Todo.url + "/" + $(Todo.log[0]).attr('_id'),
            method: 'DELETE',
            success: function(data) {
                console.log("deleted", data);
            },
            error: function(err) {
                console.log('uhoh', err);
            }
        })},
    }
