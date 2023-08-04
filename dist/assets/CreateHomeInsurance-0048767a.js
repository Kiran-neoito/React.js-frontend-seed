import{j as e,a as o,r as s}from"./jsx-runtime-9fe3b506.js";import{u as I,a as q,b as D,M as T,S as $,g as O,s as Y,c as H}from"./index-29587d46.js";import{E as K,C as Q}from"./Compas-df40770c.js";const z="/assets/Arrow-05868faa.svg",j=({items:p,AddGeoData:l,removeGeoData:u})=>e("div",{className:"flex gap-12 py-3",children:p.map(i=>o("div",{className:"flex gap-1 items-center",children:[e("input",{type:"checkbox",className:"accent-primary-gray w-[17px] h-[17px]",id:i.id,onChange:x=>{x.target.checked?l(i.text):u(i.text)}}),e("label",{htmlFor:i.id,className:"font-medium text-primary-gray",children:i.text})]},i.id))}),W=[{text:"Sea",id:"sea"},{text:"Riverine",id:"riverine"},{text:"Flash",id:"flash"}],J=[{text:"Storm",id:"storm"},{text:"Wind",id:"wind"},{text:"Lightning",id:"lightning"}],X=[{text:"Tree",id:"tree"},{text:"Debris",id:"debris"}],ee=({AddGeoData:p,geoData:l,removeGeoData:u,setGeoData:i,handleCreatePolciy:x,address:b})=>{var v;const[h,y]=s.useState("Risk"),[N,w]=s.useState(!1),[S,F]=s.useState(!1),[g,E]=s.useState(!1);return o("div",{className:"max-w-96 w-1/5 p-5 bg-white",children:[e("div",{className:"w-full flex items-center py-3 px-2 border border-[#E6E7E8] rounded-md shadow mb-12 gap-3",children:e("span",{className:"font-medium text-sm text-[#666666]",children:(v=b==null?void 0:b.data)==null?void 0:v.data.features[0].properties.place.name})}),o("div",{className:"flex flex-col justify-center gap-3 w-full",children:[o("div",{className:"w-full flex items-center font-medium text-base cursor-pointer mb-2",children:[e("div",{className:`w-1/2 border-b flex items-center justify-center py-3 px-5 ${h==="Risk"?"text-primary border-primary bg-[#F1F2F3]":"text-primary-gray border-primary-gray"}`,onClick:()=>y("Risk"),children:"Risk Factors"}),e("div",{className:`w-1/2 border-b flex items-center justify-center py-3 px-5 ${h==="Geo"?"text-primary border-primary bg-[#F1F2F3]":"text-primary-gray border-primary-gray"}`,onClick:()=>y("Geo"),children:"Geo Data"})]}),o("div",{className:"flex items-center gap-1 py-3",children:[e("input",{type:"checkbox",className:"accent-primary-gray w-[17px] h-[17px]",id:"location",onChange:a=>{a.target.checked?i({...l,location:(!0).toString()}):i({...l,location:(!1).toString()})}}),e("label",{htmlFor:"location",className:"font-medium text-primary-gray",children:"Location"})]}),o("div",{className:"w-full",children:[o("div",{className:`w-full flex items-center gap-2 py-3 ${N?"border-b border-primaryGray":""}`,children:[e("img",{src:z,alt:"open submenu",className:`cursor-pointer ${N?"transform rotate-90":""}`,onClick:()=>w(a=>!a)}),e("label",{htmlFor:"location",className:"font-medium text-primary-gray",children:"Flooding"})]}),N?e(j,{items:W,geoData:l.Flooding,AddGeoData:a=>p(a,"flood"),removeGeoData:a=>u(a,"flood")}):null]}),o("div",{className:"flex items-center gap-1 py-3",children:[e("input",{type:"checkbox",className:"accent-primary-gray w-[17px] h-[17px]",id:"bushfire",onChange:a=>{a.target.checked?i({...l,fireStation:(!0).toString()}):i({...l,fireStation:(!1).toString()})}}),e("label",{htmlFor:"bushfire",className:"font-medium text-primary-gray",children:"Bushfire + D2 fire station"})]}),o("div",{className:"flex items-center gap-1 py-3",children:[e("input",{type:"checkbox",className:"accent-primary-gray w-[17px] h-[17px]",id:"crime",onChange:a=>{a.target.checked?i({...l,policeStation:(!0).toString()}):i({...l,policeStation:(!1).toString()})}}),e("label",{htmlFor:"crime",className:"font-medium text-primary-gray",children:"Crime + D2 police station"})]}),o("div",{className:"w-full",children:[o("div",{className:`w-full flex items-center gap-2 py-3 ${S?"border-b border-primaryGray":""}`,children:[e("img",{src:z,alt:"open submenu",className:`cursor-pointer ${S?"transform rotate-90":""}`,onClick:()=>F(a=>!a)}),e("span",{className:"font-medium text-primary-gray",children:"Climate"})]}),S?e(j,{items:J,geoData:l.Climate,AddGeoData:a=>p(a,"climate"),removeGeoData:a=>u(a,"climate")}):null]}),o("div",{className:"w-full",children:[o("div",{className:`w-full flex items-center gap-2 py-3 ${g?"border-b border-primaryGray":""}`,children:[e("img",{src:z,alt:"open submenu",className:`cursor-pointer ${g?"transform rotate-90":""}`,onClick:()=>E(a=>!a)}),e("label",{htmlFor:"location",className:"font-medium text-primary-gray",children:"D_Zone"})]}),g?e(j,{items:X,geoData:l.D_Zone,AddGeoData:a=>p(a,"dzone"),removeGeoData:a=>u(a,"dzone")}):null]}),o("div",{className:"flex items-center gap-1 py-3",children:[e("input",{type:"checkbox",className:"accent-primary-gray w-[17px] h-[17px]",id:"roof-type",onChange:a=>{var n;a.target.checked&&i({...l,Roof_Type:(n=a.target.checked)==null?void 0:n.toString()})}}),e("label",{htmlFor:"roof-type",className:"font-medium text-primary-gray",children:"Roof Type"})]}),o("div",{className:"flex items-center gap-1 py-3",children:[e("input",{type:"checkbox",className:"accent-primary-gray w-[17px] h-[17px]",id:"roof-visual",onChange:a=>{var n;a.target.checked&&i({...l,Roof_Visual:(n=a.target.checked)==null?void 0:n.toString()})}}),e("label",{htmlFor:"roof-visual",className:"font-medium text-primary-gray",children:"Roof Visual"})]}),o("div",{className:"flex items-center gap-1 py-3",children:[e("input",{type:"checkbox",className:"accent-primary-gray w-[17px] h-[17px]",id:"size",onChange:a=>{var n;a.target.checked&&i({...l,Building_Size:(n=a.target.checked)==null?void 0:n.toString()})}}),e("label",{htmlFor:"size",className:"font-medium text-primary-gray",children:"Building Size"})]}),o("div",{className:"flex items-center gap-1 py-3",children:[e("input",{type:"checkbox",className:"accent-primary-gray w-[17px] h-[17px]",id:"year",onChange:a=>{var n;a.target.checked&&i({...l,Construction_Year:(n=a.target.checked)==null?void 0:n.toString()})}}),e("label",{htmlFor:"year",className:"font-medium text-primary-gray",children:"Construction Year"})]})]}),e("button",{type:"submit",className:"primary-btn btn w-full h-12 p-3 mt-12",onClick:x,children:"Calculate Risk Score"})]})},oe=()=>{const[p,l]=s.useState("Insurance"),[u,i]=s.useState(!1),[x,b]=s.useState(15),[h,y]=s.useState(""),[N,w]=s.useState(""),[S,F]=s.useState(""),[g,E]=s.useState(""),[v,a]=s.useState(""),[n,R]=s.useState(!1),A=I(),[c,f]=s.useState({location:"false",Flooding:[],fireStation:"false",policeStation:"false",Climate:[],D_Zone:[],Roof_Type:"false",Roof_Visual:"false",Building_Size:"false",Construction_Year:"false"}),[d,C]=s.useState({long:null,lat:null}),[k,M]=s.useState({long:1.29512,lat:103.857461}),{data:_,refetch:B}=q({enabled:!1,queryKey:["geo-reverse"],keepPreviousData:!0,queryFn:()=>O({longitude:k.lat,latitude:k.long})}),Z=D({mutationFn:Y,onSuccess:t=>{var r,m;((r=t.data)==null?void 0:r.message)==="No results found"?a((m=t.data)==null?void 0:m.message):(t.data.data["geojson:properties"]["vocabulary:address"][0]["vocabulary:countryCode"]&&w(t.data.data["geojson:properties"]["vocabulary:address"][0]["vocabulary:countryCode"]),t.data.data["geojson:properties"]["vocabulary:name"]&&F(t.data.data["geojson:properties"]["vocabulary:name"]),t.data.data["geojson:geometry"].coordinates[0]&&C({lat:t.data.data["geojson:geometry"].coordinates[0],long:t.data.data["geojson:geometry"].coordinates[1]}),M({lat:t.data.data["geojson:geometry"].coordinates[0],long:t.data.data["geojson:geometry"].coordinates[1]}))},onError:t=>{var r,m;(m=(r=t.response)==null?void 0:r.data)!=null&&m.message&&console.log(t.response.data.message)}}),L=D({mutationFn:H,onSuccess:()=>{A("/home-insurance")},onError:t=>{var r,m;(m=(r=t.response)==null?void 0:r.data)!=null&&m.message&&console.log(t.response.data.message)}}),G=(t,r)=>{r==="flood"?f({...c,Flooding:[...c.Flooding,t]}):r==="climate"?f({...c,Climate:[...c.Climate,t]}):r==="dzone"&&f({...c,D_Zone:[...c.D_Zone,t]})},U=(t,r)=>{r==="flood"?f({...c,Flooding:c.Flooding.filter(m=>m!=t)}):r==="climate"?f({...c,Climate:c.Climate.filter(m=>m!=t)}):r==="dzone"&&f({...c,D_Zone:c.D_Zone.filter(m=>m!=t)})},P=()=>{if(d.lat&&(d!=null&&d.long)){const t={geoData:c,country:N||"SGP",latitude:d.lat,longitude:d.long};L.mutate(t)}},V=()=>{d.long&&d.lat?(M({long:d.long,lat:d.lat}),C({long:d.long,lat:d.lat})):C({long:1.29512,lat:103.857461}),R(!0),y("compass")};return s.useEffect(()=>{p==="risk"&&(C({long:k.long,lat:k.lat}),B())},[p]),s.useEffect(()=>{n&&(B(),R(!1))},[n]),e("div",{children:p==="risk"?o("div",{className:" inset-0 w-full h-screen z-0 flex",children:[e(ee,{geoData:c,setGeoData:t=>f(t),AddGeoData:(t,r)=>G(t,r),removeGeoData:(t,r)=>U(t,r),handleCreatePolciy:P,address:_}),e(T,{location:h==="compass"?k:d,sidbar:p,address:_,markerType:h})]}):o("div",{className:" inset-0 w-full h-screen z-0 flex",children:[o("div",{className:"bg-white flex top-2 pl-2 left-20 z-20 absolute mt-[30px] w-[300px]  border-none  rounded-[5px]  ",children:[e("input",{value:g,onChange:t=>{E(t.target.value),a("")},className:" pl-2  z-20 relative p-[14px] w-[230px] text-[14px] font-medium border-none focus:outline-none text-[#666666]  placeholder:text-[#8F8F8F] ",placeholder:"Search for address"}),e("button",{className:"relative left-0 text-[14px] mt-1 bottom-0.5 border-none z-20 text-gray-500 bg-white",onClick:()=>{Z.mutate({query:g}),y("location")},disabled:g.length===0,children:"Confirm"})]}),v.length>0?e("p",{className:"z-20 absolute top-[88px] font-medium border-solid border-[#E8E8E8] left-20 pl-4 py-4 px-3 w-[300px] bg-white text-[#F21E1E] text-sm",children:v}):null,e(T,{location:d,markerType:h,setSideBar:()=>l("risk"),sidbar:p,elevation:u,draggable:!0,zoom:x,setZoom:t=>b(t),region:S,setCoordinates:(t,r)=>M({long:t,lat:r}),setMarkerType:t=>y(t),address:_}),e("button",{title:"Elevation",className:"absolute right-2 top-[20px] px-1 bg-white cursor-pointer",onClick:()=>{i(t=>!t)},children:e("img",{src:K,alt:"elevation"})}),e("button",{title:"Marker",className:"absolute right-2 top-[64px] px-1 bg-white cursor-pointer",onClick:V,children:e("img",{src:Q,alt:"elevation"})}),Z.isLoading&&e($,{}),L.isLoading&&e($,{})]})})};export{oe as default};