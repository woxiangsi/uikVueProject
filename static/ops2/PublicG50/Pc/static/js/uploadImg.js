var _upload_ns = { blob1: '', blob2: '', blob3: '', images: [] };
function deleteImg(id) {
    $("#del" + id).removeClass("deleteclose2");
    $("#img" + id).hide();
    if (id == 1) {
        $('#image1').prop('src', '');
        _upload_ns.image1 = '';
        _upload_ns.blob1 = '';
    } else if (id == 2) {
        $('#image2').prop('src', '');
        _upload_ns.image2 = '';
        _upload_ns.blob2 = '';
    } else if (id == 3) {
        $('#image3').prop('src', '');
        _upload_ns.image3 = '';
        _upload_ns.blob3 = '';
    }

    //generateImagesArr();
}

function generateImagesArr() {
    _upload_ns.images = [];
    for (var i = 1; i <= 3; i++) {
        if (_upload_ns['blob' + i]) _upload_ns.images.push(_upload_ns['blob' + i]);
    }
}

function showPic(id, url) {
    $("#img" + id).show();
    if (id == 1) {
        $('#img1').prop('src', url);
        $("#filename" + id).val('');
        $('#img1').load(function(){
           $('.updating').remove();
           $("#del" + id).addClass("deleteclose2");
        })
    } else if (id == 2) {
        $('#img2').load(function(){
           $('.updating').remove();
           $("#del" + id).addClass("deleteclose2");
        })
        $('#img2').prop('src', url);
        $("#filename" + id).val('');
    } else if (id == 3) {
        $('#img3').load(function(){
           $('.updating').remove();
           $("#del" + id).addClass("deleteclose2");
        })
        $('#img3').prop('src', url);
        $("#filename" + id).val('');
    }
}

function uploadToServer(cb) {
    generateImagesArr();
    $('#loading-dialog').show();
    $('#loading-dialog').find('.loading-txt').text('意见提交中');
    if (_upload_ns.images.length) {
        $.ajax({
            url: rootPath + '/index.php/home/index/getPicAccessToken',
            dataType: 'json',
            type: 'post',
            success: function (rs) {
                if (rs.success) {
                    var token = rs.accessToken.accessToken;
                    var formData = new FormData();
                    if(_upload_ns.blob1) formData.append('file1', _upload_ns.blob1);
                    if(_upload_ns.blob2) formData.append('file2', _upload_ns.blob2);
                    if(_upload_ns.blob3) formData.append('file3', _upload_ns.blob3);
                    formData.append('accessToken', token);
                    formData.append('category', '02');
                    $uploadurl = rootPath + '/index.php/home/index/uploadPic';
                    $.ajax({
                        url: $uploadurl,
                        dataType: 'json',
                        data: formData,
                        processData: false,
                        cache: false,
                        contentType: false,
                        type: 'post',
                        success: function (rs) {
                            if (rs.success) {
                                cb(rs);
                            } else {
                                $('#loading-dialog').hide();
                                alert('图片上传失败!');
                            }
                        }
                    })
                } else {
                    $('#loading-dialog').hide();
                    alert('无法获取token');
                }
            }
        })
    }else{
        cb([]);
    }
}

function resetUpload(){
    _upload_ns = { blob1: '', blob2: '', blob3: '',images: [] };
    $("#img1").hide();
    $("#img2").hide();
    $("#img3").hide();

    $('#filename1').val('');
    $('#filename2').val('');
    $('#filename3').val('');
    $('#img1').prop('src', '');
    $('#img2').prop('src', '');
    $('#img3').prop('src', '');

    $('.updating').remove();

    $("#del1").removeClass("deleteclose2");
    $("#del2").removeClass("deleteclose2");
    $("#del3").removeClass("deleteclose2");
}

function upload(id) {
    var file = document.getElementById('filename'+id).files[0] //获取要上传的文件
    var type = file.type;
    if (type.indexOf("image") != -1) {
        if ($("#filename" + id).val() != "") {
            $("#del" + id).removeClass('deleteclose2');
            $("#img" + id).parent('li').append('<div class="updating"><span>上传中</span><div class="progressBar1"><div class="progressBar2"></div></div></div>');
            var reader = new FileReader();
            (function(reader,id){
                reader.readAsDataURL(file);
                reader.onload = function (e) {
                // 图片base64化
                var imgUrl = e.target.result;
                canvasDataURL(imgUrl, { quality: 0.2 }, function (compressedImgUrl) {
                    showPic(id, compressedImgUrl);
                    _upload_ns['blob' + id] = convertBase64UrlToBlob(compressedImgUrl);
                });
            };
            })(reader,id);
        } 
    }else {
        $("#filename" + id).val('');
        alert('该文件类型不识别');
    }
}