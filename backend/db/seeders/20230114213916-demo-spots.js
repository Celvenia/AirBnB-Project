"use strict";
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = "Spots";
    return queryInterface.bulkInsert(
      options,
      [
        {
          ownerId: 1,
          address: "123 Wonderwhere Blvd.",
          city: "Monroe",
          state: "Utah",
          country: "United States",
          lat: 41.315625,
          lng: 111.997382,
          name: "Cobblestone Ranch Cabin",
          description: `This charming little cabin is located at the base of Monroe Mountain. It has spectacular views of mountains in all directions from the loft deck. It sleeps 5 guests comfortably. It is a darling and cozy little home base for Utah's Mighty 5 National Parks, or to relax and enjoy Monroe Mountain, Hot Springs, ATV trails, fishing, hiking, and wildlife all nearby. In summer months, enjoy watching the para-gliders/hang-gliders land just across the street. We will consider requests for 1 night stays.
        The space
        Walk out of the loft to relax on the upper deck with spectacular views of the Tushar Mountain range, The Cove Basin, Pahvant Mountain range and of course Monroe Mountain. Do some star gazing and enjoy roasting marshmallows and eating s’mores. Lounge on the front porch and watch the para-gliders and grill up a tasty dinner. Relax on an outdoor futon/pull out bed on the west side porch and take in the gorgeous sunsets. Eat breakfast on the porch on the table provided or it is a great place to "work from home". We have one 4 seated UTV (side by side) rental is available with guests having first option. Next door but far enough away not to bother you is a new RV park and the big "Red Barn" which is a small convenience store with fountain drinks, hand scooped "creamery" hard ice-cream brought in from Provo, UT and a variety of old fashioned candy and treats. Make sure you visit the Red Barn, Jordan is the best!

        Some guests have wondered about the old white dairy barn that is about 50 yards behind the cabin. It was called the Hi Roe dairy barn was a co-op of 13 families, early dairy farmers that built and owned it together, including our ancestors. As it was a significant structure in Monroe, it was built right at the end of main street in Monroe. You will notice we have started purchasing building supplies and we have plans to rebuild the barn, just as this little cabin was rebuilt from an old grainery that was located on a different property in town. We are choosing to rebuild it into something cool versus demolishing it due to its historical significance. Many guests have enjoyed it as a perfect "photo" spot.

        *Please note, the hammock that is pictured in one of the pictures has been replaced due to safely concerns with the cement underneath it. We have replaced it with a hanging lounge chair that can be moved to the location of choice depending on if you want to watch the sunrise and/or para-gliders in the East or the sunset in the West.
        Guest access
        There is plenty of parking around the cabin for ATV trailers, etc.
        Other things to note
        We have blocked off holidays just to make sure that no one has to clean on the holiday, but guests are welcome to contact us and can unblock it if they want to stay THROUGH the holiday.

        PETS... Please don't "sneak" your pets in. We love our furry friends and love to take them with us when we travel and so you are welcome to bring them along as long as they are well trained and closely watched by their humans (Please maximum of 2 unless special permission is given). It is helpful if you bring their own beds/blankets for them to lounge/sleep on. However, sometimes It does put added time and responsibility on our cleaners. If your pet is known to shed, please plan to be respectful and leave a pet fee for the extra time for our cleaner. If there is an abundance of pet hair on things which require extra time cleaning up the dog hair/fur or extra washings of linens, and nothing left for the cleaner, we will kindly request a pet fee of $30 at the end of your stay. This is a total fee, NOT per pet and NOT per night. We really hate asking at the end, (and hardly ever do) but would like to be fair to those who have to spend extra time cleaning up after the furry loved one, so please help us not "require" a pet fee on future bookings and save us the awkward "charge back" by leaving something for the cleaner if your pet is of the shedding kind.`,
          price: 164,
        },
        {
          ownerId: 2,
          address: "210 Midonowea Pl.",
          city: "Granite Falls",
          state: "Washington",
          country: "United States",
          lat: 22.222222,
          lng: 22.212121,
          name: "Canyon Creek Cabin",
          description: `Perched high on a granite ledge, you will find this cabin overlooking a rushing river that weaves its way through the dense, lush forest of the North Cascade mountains. The unique asymmetrical A-frame structure is both unexpected and familiar, with its wood-clad walls, exposed beams, and large geometric windows. Whether you are playing whiskey-fueled card game by the fire, or lounging in the hottub while listening to the nearby rushing creek, this cabin offers the ultimate cabin experience.
          The space
          It was originally built as a fishing cabin in the 1970's. Then it was remodeled and expanded to what what you see today. The cabin interior has been thoughtful curated by the cabin's owners with uniquely designed objects, furniture, textiles, and art from their design shops in Seattle; Glasswing and their recently opened plant store, Greenhouse.

          Follow our cabin adventures on Instagram at @canyoncreekcabins

          Children and dogs are welcome.
          Guest access
          The cabin is just minutes outside of the small town of Granite Falls, which is the gateway to the Cascade Mountains. Just a 20-30 minutes down the Mountain Loop Highway you will find some of the best hiking and most beautiful natural features that Washington has to offer. Some favorites include: Gothic Basin, Big Four Ice Caves, Mt. Pilchuck Fire Lookout, Lake Twenty-Two, and Heather Lake.
          There is also an amazing river (technically a creek, but a big one!) that runs right behind the cabin. Experienced kayakers will find this a thrilling run, but it's not for the faint of heart! In the late summer months adventure seekers can embark on a little-known 2 mile hike that through the basin of Canyon Creek. With granite canyon walls towering as high as 100 feet above, you'll hike upstream through rocks and flowing stream, occasionally resorting to swimming through 20' deep pools as you navigate through the creekbed. Do not attempt this "hike" if you are not a strong swimmer.

          Please note: Our cabins are in a private community of other cabins, mostly occupied by the owners. While you are welcome to explore the river and the nearby park, please refrain from wandering the private roads of the community, as the neighbors like their privacy. Instead, we recommend driving a few minutes up Mountain Loop Hwy and exploring the numerous incredible public trails available there, as previously mentioned.
          Other things to note
          Frequently Asked Questions:

          Do you allow dogs? — YES! We are dog friendly, but do not allow cats or any other pets.

          Can I check in early or check out late? — Since our cabins are usually booked back-to-back, and our cleaners need time to prepare the cabin for the next guest, unfortunately we can not accommodate early check in or late check out. Occasionally our cleaner gets the cabin ready an hour or so early, and if that happens we will let you know day of. Please do NOT arrive early with plans to “hang out” until our cleaner is finished. It only prolongs the cleaning and frustrates our cleaners.

          Do you have a coffee maker and do you supply coffee? — We do have a pour over and French press at the cabin, as well as a bean grinder. We try to supply coffee beans, but recommend do bring your own, as it’s very hard to keep stocked and many guests have preferred coffee bean types.

          Do you have a BBQ grill? — Yes, we have a propane BBQ on the back deck. We supply the propane and utensils.`,
          price: 386,
        },
        {
          ownerId: 3,
          address: "321 Flash Dr.",
          city: "Bend",
          state: "Oregon",
          country: "United States",
          lat: 33.333333,
          lng: 33.313131,
          name: "Private Luxury Cabin",
          description: `The private & spectacular Lakeside West Cabin (3 bedr/3.5 bath, sleeps 8) overlooks Tumalo Lake with cozy wood-burning stove, private hot tub, & amazing lake views. 12 mi to downtown Bend, 45 min to Mt Bachelor and 4 mi to Tumalo Falls. Immerse in nature and be as active as you choose: hiking, mountain biking, fishing, complimentary canoes, kayaks, SUPs, snowshoeing, sledding, hammock, horseshoe and corn hole game, shared fire pit. Need more or less space? We have 2, 4 and 6 - 8 bedroom cabins.
          The space
          The Lakeside West Cabin (3 bedroom/3.5 bath, sleeps 8) is a stunning luxury cabin overlooking Tumalo Lake surrounded by ponderosa pine trees, located just 12 miles west of downtown Bend.  Situated on a unique 640-acre private parcel of forested land surrounded on all sides by the Deschutes National Forest, there are limitless trails for hiking, biking, x-country skiing and snowshoeing and the private lake offers free fishing, kayaking, canoeing and SUP.  There is a wonderful 2-mile hike around the lake, a lakeside deck with chairs and a picnic table, a swimming dock and a lakeside fire pit (not allowed during fire season).

          The Lakeside West Cabin is a high-end masterpiece of craftsmanship, constructed of huge Douglas Fir beams, cedar siding and shakes. Huge windows in every room provide a tree-house sensation with amazing views of nature in every direction. The large wrap-around deck and comfortable Adirondack chairs and rockers allow for relaxing in the fresh air while taking in the gorgeous natural surroundings and views.

          The beautiful furnishings create an ambiance of casual luxury. The cabin's interior features knotty pine wood walls, doors and trim, knotty alder cabinets, and granite counter tops. The first floor open floor plan includes radiant heated floors and decorative rugs. The living area has a wood-burning stove and huge windows with lake views. The dining area has floor to ceiling windows with views of nature on all sides. The kitchen area features granite counter tops and stainless appliances including a Jenn-Air professional stove. There is a half bath on this floor and a queen bedroom with ensuite bathroom with direct access to the deck.

          The second floor features gorgeous high-pitched wood ceilings, two charming queen bedroom suites with ensuite baths and a second living room area. The upstairs living area has huge windows with commanding views of the lake and a queen sofa bed. Bedrooms feature iron beds with quilts, cozy down comforters and pillows, and high thread count sheets. Each bedroom has amazing views in three directions. The ensuite baths feature either a shower over bathtub, granite counter tops, radiant heated floors, shampoo, conditioner and body lotion amenities and hair dryer.

          There are a multitude of activities and amenities right out your door on the Tumalo Lake property. Enjoy hiking (there is a wonderful 2-mile hike around the lake and other longer ones), mountain biking, swimming, boating (complimentary kayaks, canoes, SUPs), fishing (no license required), birding, and playing cornhole and horseshoes. Relax on your private deck in a hammock or at the shared fire pit or lake deck, and stargaze from your private hot tub. While wildlife viewing from your deck, the lake deck or on the lake in your kayak/canoe you may spot ducks, blue heron, osprey, golden eagles, bald eagles as well as great horned owl, pileated woodpecker and others. In winter, snowshoe, sled, x-country ski, cozy up around your wood-burning stove or outside with s'mores at the shared fire pit.

          Need more or less space? We also have 2, another 3, 4 and 6 - 8 bedroom cabins.  The closest one to Lakeside West is the nearly identical Lakeside East cabin.
          Guest access
          Guests have the entire cabin, the wrap around deck with Adirondack rocking chairs, gas grill and private hot tub.
          Shared outdoor spaces include the lake with a 2-mile hiking trail, boats, fire pit, lakeside deck with chairs and a picnic table, a swimming dock and a lakeside fire pit (except during fire season).
          Other things to note
          Cell phones will work in the cabin if WIFI calling is enabled on your phone. There is a land line phone. Satellite WIFI is shared among 4 cabins. The speed is usually good however it does not support streaming/zoom/gaming.

          There is no TV.

          Winter vehicle requirement: We plow our access road however as it will be snow packed and may be slippery, all-wheel or 4-wheel drive vehicles (with chains available as a precaution) are required.`,
          price: 346,
        },
        {
          ownerId: 4,
          address: "432 Maneegoa Way.",
          city: "Joshua Tree",
          state: "California",
          country: "United States",
          lat: 44.444444,
          lng: 44.414141,
          name: "The Kellogg Doolittle House",
          description: `This is the famous Kellogg Doolittle estate in Joshua Tree California. It is one of the most exclusive homes in the world, and available for the first time as an Airbnb Luxe exclusive.

          Created over 25 meticulous years, Kellogg Doolittle in Joshua Tree National Park is a marvel of the organic architecture movement. A residence that is so “one-of-a-kind,” nearly every element, inside and out, is handcrafted by architect Ken Kellogg and Master Craftsman John Vugrin. The masterpiece of organic architecture sits along the breathtaking landscape of Joshua Tree National Park, the location that lent itself as the ambitious vision and inspiration behind the design.

          Kellogg, a former protege of Frank Lloyd Wright, has taken organic architecture to new levels with this outstanding house. The Kellogg-Doolittle House contains no straight lines or rectangular spaces. Instead, the house forms around 26-winged piers composed of organic material built quietly into the natural landscape: the kitchen and living room stretch softly around an unmoved, million-year-old rock formation, while the glass panels peek into a sprawl of sunrise and sunset views.

          Located on a quiet edge of Joshua Tree National Park, you have your private path into an un-trafficked section of the park, just steps from the front door. Take an easy drive to the main park entrance, start your exploration with a stroll through the Cholla Cactus Gardens, snap a few photos at Skull Rock, and hike the Hidden Valley Nature Trail; or stay at home, shut the world out, sit around the fire pit and wait for a chance to see the Milky Way in your exclusive dark sky view. If you're in the mood for city life, Palm Springs is an easy hour’s drive.

          The Kellogg Doolittle home offers unparalleled privacy, quiet, park access, and remote property bouldering. Step away from the rest of the world in this one-of-a-kind home.

          Copyright © Luxury Retreats. All rights reserved.


          BEDROOM & BATHROOM
          • Bedroom 1 - Master: European king size Hastens bed, Ensuite bathroom with stand-alone shower & bathtub, Dual vanity, Walk-in closet, Night Sky View
          • Bedroom 2: Fourteen Foot Round Custom Hastens bed, National Park and Mountain view
          • Bedroom 3: Queen size Hastens bed, Ensuite bathroom with stand-alone rain shower


          FEATURES & AMENITIES
          • Fully equipped kitchen
          • Formal dining area with seating for 6
          • Ice maker
          • Dishwasher
          • Wi-Fi
          • Smart TV
          • Sonos sound system
          • Office (Three individual work areas)
          • Decorative fireplace
          • Air conditioning
          • Heating
          • Washer/Dryer
          • Iron/Ironing board


          OUTDOOR FEATURES
          • Mountain view
          • National Park View
          • Hot tub
          • Charcoal barbecue
          • Alfresco dining area with seating for 2
          • Outdoor Bar
          • Wood Firepit
          • Golf cart
          • Driveway parking - 6 spaces


          STAFF & SERVICES

          Extra Cost (advance notice may be required):
          • Villa pre-stocking
          • Airport transfers
          • Activities and excursions
          • Housekeeping
          License number
          CESTRP-2021-01387`,
          price: 5150,
        },
        {
          ownerId: 5,
          address: "543 StayeInyo Ln.",
          city: "Clancy",
          state: "Montana",
          country: "United States",
          lat: 55.555555,
          lng: 55.515151,
          name: "The Hideaway at Creekside Meadows",
          description: `Nestled in the foothills of the Elkhorn Mountains you'll find our charming earth home. Clean Scandinavian style decor allows the magnificent construction of this home to shine. A few unique features include 4 full sized built in sleeping nooks each with their own lights and electrical outlets, a secret door to a hidden private bedroom, and a shower you enter through a ‘tree trunk’ with almost 13ft ceilings!
          The space
          Bring your friends and family and enjoy the outdoors or cuddle up inside. Our place is so fun and cozy you might not want to leave! We hope you like your companions, because there is only one private bedroom (the secret room) and one bathroom. We think our place best suits gatherings and good times!
          Guest access
          We have two Airbnb's on our property, The Hideaway and The BARbnb. Both have access to the trail and the creek so unless you rent both there may be another group you'll run into while utilizing those features. Be kind and mindful of each other's space!
          Other things to note
          Our place is NOT remote. Although we have a large property, we do have neighbors. Please be respectful and keep outside noise to a minimum after 10pm.
          We are located just 3 miles off the Clancy exit; 15 mins from downtown Helena.`,
          price: 170
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = "Spots";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, null, {});
  },
};
