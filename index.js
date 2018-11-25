// toastr提示插件的全局设置
toastr.options.positionClass = "toast-top-center";
toastr.options.timeOut = 0;
toastr.options.extendedTimeOut = 0;

var graph = new Dijkstra(map_input);
var $map_container = $('#map_container');
var $map = $('#map');

// 在指定的坐标上画圆点
function draw_point($container, x, y){
    var $point = $('<i class="site-point"></i>');
    var point_radius = 8;
    $point.attr('style','position:absolute;border:'+point_radius+'px solid red;border-radius:'+point_radius+'px;');
    $point.css('left', x - point_radius);
    $point.css('top', y - point_radius);
    $container.append($point);
}

// 点击按钮后开始计算路线
function start(){
    var site_start,site_end;
    toastr.clear();
    toastr.warning('请在地图上点击任意站点作为出发地！','选择出发地');
    $map_container.find('i.site-point').remove();
    $map.off('click').on('click',(function(e){
        var site = find_site(positions, e.offsetX, e.offsetY);
        draw_point($map_container, positions[site].x, positions[site].y);
        site_start = site;

        toastr.clear();
        toastr.warning('请在地图上点击任意站点作为目的地！','选择目的地');
        $map.off('click').on('click',(function(e){
            var site = find_site(positions, e.offsetX, e.offsetY);
            draw_point($('#map_container'), positions[site].x, positions[site].y);
            site_end = site;
            show_start_tip();
            console.log(graph.findShortestPath(site_start, site_end));
        }));
    }));
}

// 显示开始时的提示
function show_start_tip(){
    $map.off('click');
    toastr.clear();
    toastr.warning('<div><button id="start" onclick="window.start()">开始规划路线</button></div>','点击按钮开始您的轻轨旅程');
}

show_start_tip();