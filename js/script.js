let idCounter = 0;

document.getElementById('postit-form').addEventListener('submit', function(e) {
    e.preventDefault();
    var content = document.getElementById('postit-content').value;
    var header = document.getElementById('postit-header').value;
    var color = document.getElementById('postit-color').value;
    var postit = document.createElement('div');
    postit.className = 'postit';
    postit.id = 'postit-' + idCounter++;
    postit.innerHTML = '<div class="postit-header" style="background-color: ' + color + '"><span>' + header + '</span></div><div class="postit-body"><p>' + content + '</p></div><button class="edit"><i class="material-icons">edit</i></button><button class="delete"><i class="material-icons">delete</i></button>';
    document.getElementById('postit-container').appendChild(postit);
    document.getElementById('postit-content').value = '';
    document.getElementById('postit-header').value = '';
    document.getElementById('postit-color').value = '#ffffff'; 

    interact('.postit').draggable({
        listeners: {
            move(event) {
                var target = event.target,
                    x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
                    y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

                target.style.transform = 'translate(' + x + 'px, ' + y + 'px)';
                target.setAttribute('data-x', x);
                target.setAttribute('data-y', y);
            }
        }
    });
});

document.getElementById('postit-container').addEventListener('click', function(e) {
    let target = e.target;
    if (target.tagName === 'I') {
        target = target.parentNode;
    }

    if (target.className === 'delete') {

        document.getElementById('deleteModal').style.display = "block";

        window.postitToDelete = target.parentNode;
    } else if (target.className === 'edit') {
        var header = target.parentNode.querySelector('.postit-header span');
        var body = target.parentNode.querySelector('.postit-body p');
        if (header.contentEditable === "true") {
            header.contentEditable = "false";
            body.contentEditable = "false";
            target.innerHTML = '<i class="material-icons">edit</i>';
        } else {
            header.contentEditable = "true";
            body.contentEditable = "true";
            target.innerHTML = '<i class="material-icons">save</i>';
        }
    }
});


document.getElementById('confirmDelete').addEventListener('click', function() {
    window.postitToDelete.remove();
    document.getElementById('deleteModal').style.display = "none";
});

document.getElementById('cancelDelete').addEventListener('click', function() {
    document.getElementById('deleteModal').style.display = "none";
});