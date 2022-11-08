import {OrbitControls} from './modules/OrbitControls.js';


window.onload = function() {    /*Выполняется при загрузке окна*/
    var width = window.innerWidth  
    var height = window.innerHeight    /* Получаем ширину и высоту экрана */
    var canvas = document.getElementById('canvas');    /* Находим канвас в html файле по id */

    canvas.setAttribute('width', width);
    canvas.setAttribute('height', height);    /* Установка размеров канваса (по размеру окна) */

    var box = {
        box_width:0,
        box_height: 0,
        box_rotation: 0
    } ;

    var gui = new dat.GUI();
    gui.add(box,'box_width').min(100).max(1000).step(1);
    gui.add(box,'box_height').min(100).max(1000).step(1);
    gui.add(box,'box_rotation').min(0).max(100).step(1);
    
    
    

    var renderer = new THREE.WebGL1Renderer({canvas: canvas});   /* Создание рендерера и присоединение к нему канваса */
    renderer.setClearColor(0x000000);

    var scene = new THREE.Scene();    /* Создание сцены */

    var camera = new THREE.PerspectiveCamera(45, width/height, 0.1, 5000 );    /* Создание перспективной камеры  (45- максимальный вертикальный угол обзора, width/height - пропорции отображения камеры)*/
    camera.position.set(0, 0, 1000);    /* Задание позиции камеры */

    const controls = new OrbitControls(camera,renderer.domElement);
    controls.update();

    var light = new THREE.AmbientLight(0xffffff);    /* Рассеянный свет */
    scene.add(light);

    const texture = new THREE.TextureLoader().load('Glass.jpeg');   /* Загрузил текстуру в переменную */
    var geometry = new THREE.BoxGeometry(600,700);    /* Создание геометрии плоскости */
    var material = new THREE.MeshBasicMaterial({ wireframe: false, map: texture});     /* Создание обычного материала (wireframe - чтобы объекты были пустотелыми) */
    var mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
    
    function loop(){
        
        mesh.geometry = new THREE.BoxGeometry(box.box_width,box.box_height);
       
        mesh.rotation.y += box.box_rotation/1000;
        controls.update();
        renderer.render(scene, camera); 
        requestAnimationFrame(function(){loop();});    /* Отправляет запрос на показ следующего кадра и рендерит кадр когда удобно браузеру */
    }
    
    loop();
}