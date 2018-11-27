// toastr提示插件的全局设置
toastr.options.positionClass = "toast-top-center";
toastr.options.timeOut = 0;
toastr.options.extendedTimeOut = 0;

var positions = window.positions, map_input = window.map_input;
var graph = new Dijkstra(map_input);
var $map = $('#map');
var map_ctx=document.getElementById("map-canvas").getContext("2d");
var point_radius = 8; // 站点圆心半径

// 在指定的坐标上画圆点
function draw_point($container, x, y){
    var $point = $('<i class="site-point"></i>');
    $point.attr('style','position:absolute;border:'+point_radius+'px solid red;border-radius:'+point_radius+'px;');
    $point.css('left', x - point_radius);
    $point.css('top', y - point_radius);
    $container.append($point);
}

// 在canvas上绘制路线
function draw_path(pointList){
    map_ctx.strokeStyle = "#FF0000";
    map_ctx.fillStyle = "#FF0000";
    map_ctx.lineWidth = 3;
    for(var i = 1; i < pointList.length; i++){
        var point = positions[pointList[i]];
        map_ctx.beginPath();
        map_ctx.arc(point.x, point.y,point_radius,0,2*Math.PI);
        map_ctx.fill();
    }
    map_ctx.moveTo(positions[pointList[0]].x, positions[pointList[0]].y);
    for(var j = 1; j < pointList.length; j++){
        var point = positions[pointList[j]];
        map_ctx.lineTo(point.x, point.y);
        map_ctx.stroke();
    }
}

// 在地图上点击后，找到最近的点
function find_site(positions, x, y){
    // 寻找距离鼠标点击处最近的站点，以点击点到站点的直线距离最小作为判断依据
    var min_dis = Infinity;
    var nearest_site = '';
    for(var name in positions){
        var dis = Math.pow(positions[name].x - x, 2) + Math.pow(positions[name].y - y, 2)
        if(dis < min_dis){
            min_dis = dis;
            nearest_site = name;
        }
    }
    return nearest_site;
}

// 点击按钮后开始计算路线
function start(){
    var site_start,site_end;
    map_ctx.clearRect(0,0,1920,1289);
    toastr.clear();
    toastr.success('请在地图上点击任意站点作为出发地！','选择出发地');
    $map.find('i.site-point').remove();
    $map.off('click').on('click',(function(e){
        var site = find_site(positions, e.offsetX, e.offsetY);
        draw_point($map, positions[site].x, positions[site].y);
        site_start = site;

        toastr.clear();
        toastr.success('请在地图上点击任意站点作为目的地！','选择目的地');
        $map.off('click').on('click',(function(e){
            var site = find_site(positions, e.offsetX, e.offsetY);
            draw_point($('#map_container'), positions[site].x, positions[site].y);
            site_end = site;
            show_start_tip();
            draw_path(graph.findShortestPath(site_start, site_end));
        }));
    }));
}

// 显示开始时的提示
function show_start_tip(){
    $map.off('click');
    toastr.clear();
    toastr.success('<div><button id="start" onclick="window.start()">开始规划路线</button></div>','点击按钮开始您的轻轨旅程');
}

show_start_tip();