// 03d1d7ca-657f-45ad-a51b-1f5dc85b2f4c

async function hypixelApi(hypixel, hypixel_API, uuid) {
  var request = await fetch(
    `${hypixel}?key=${hypixel_API}&uuid=${uuid}`
  );
  var data = await request.json()
  console.log(`[REQUEST] : Requested data from hypixel for the player with the uuid [${uuid}]`)
  if(data.success===false){
    console.log(`[Failed] : Request data from hypixel for the player with the uuid [${uuid}]`)
    return -1}
  if(data.player.socialMedia!==undefined){
    if(data.player.socialMedia.links.DISCORD!==undefined){
  return await data.player.socialMedia.links.DISCORD}}
  else return -1
}
module.exports = {hypixelApi}
//const uuuid={ { id: '03d1d7ca657f45ada51b1f5dc85b2f4c', name: 'Styly' } }
