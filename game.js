let c,s,r,p={x:0,y:15,z:0,vx:0,vy:0,vz:0,hp:20,food:20},w=new Map,lc=()=>{},
W=16,C=3,noise=(x,z)=>Math.abs(Math.sin(x*.3)*Math.cos(z*.2);

function init(){
    c=new THREE.PerspectiveCamera(75,innerWidth/innerHeight,.1,1e3);
    s=new THREE.Scene();s.background=new THREE.Color(0x87CEEB);
    r=new THREE.WebGLRenderer({antialias:1});r.setSize(innerWidth,innerHeight);
    document.body.append(r.domElement);
    generateWorld();
    animate();
    setInterval(()=>{p.food-=0.5;p.food<10&&(p.hp-=0.5);},1e3);
    onkeydown=e=>{e.key==' '&&p.vy<.1&&(p.vy=.2)};
    addEventListener('click',e=>{let m=new THREE.Vector3;c.getWorldDirection(m);
        let p2=new THREE.Vector3(p.x,p.y-1,p.z);for(let i=0;i<5;i++){
            p2.add(m.multiplyScalar(.2));let k=`${~~p2.x},${~~p2.y},${~~p2.z}`;
            if(w.has(k)){w.delete(k);s.remove(w.get(k));break}}},!1);
}

function generateWorld(){
    for(let x=-C;x<=C;x++)for(let z=-C;z<=C;z++){
        let g=new THREE.Group();for(let bx=0;bx<W;bx++)for(let bz=0;bz<W;bz++){
            let h=noise(x*W+bx,z*W+bz)*5+10,b=createBlock('dirt');
            b.position.set(x*W+bx,h,z*W+bz);g.add(b);w.set(`${x*W+bx},${h},${z*W+bz}`,b);
        }s.add(g);}
}

function createBlock(t){
    let g=new THREE.BoxGeometry(1,1,1),m=new THREE.MeshBasicMaterial({map:new THREE.TextureLoader().load(textures[t])});
    m.map.needsUpdate=1;return new THREE.Mesh(g,m);
}

function animate(){
    requestAnimationFrame(animate);
    p.x+=p.vx;p.y+=p.vy;p.z+=p.vz;p.vy-=.01;
    w.forEach((v,k)=>{let [x,y,z]=k.split(',').map(Number);
        if(Math.abs(x-p.x)<1&&Math.abs(y-p.y)<2&&Math.abs(z-p.z)<1)p.vy=0;});
    c.position.set(p.x,p.y+1,p.z);c.lookAt(p.x,p.y,p.z);r.render(s,c);
    document.querySelector('#stats').innerHTML=`❤️${~~p.hp} 🍗${~~p.food}`;
}

init();
onresize=()=>{c.aspect=innerWidth/innerHeight;c.updateProjectionMatrix();r.setSize(innerWidth,innerHeight);};
