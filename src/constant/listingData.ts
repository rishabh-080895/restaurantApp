export const restaurantData = [
	{
        "name": "Sublimotion Ibiza",
		"description": `Located in Ibiza, Spain, SubliMotion is run by Michelin 2-star chef Paco Roncero. The restaurant was awarded the Best Innovation Food & Beverage in 2014. Focusing on haute cuisine, SubliMotion promises to take you on an experiential trip that you have never experienced before. They feature a tasting menu consisting of 20 food tasting entrees and welcomes 12 unique diners per 'Show One' unique table. The diners are attended by a team of 25 professionals and the experience lasts approximately for 3 hours. A diner should have to shell out near about US$ 2,000 for dining in SubliMotion.`,
		"defaultPerHead": "$2,000",
        "image": require('../../assets/images/restaurant1.png'),
        "popular": false,
		"location": 'Spain',
		"_id": 1,
		"rating": '4.9',
		"reviews": 80,
	},
    {
		"name": "Per Se New York",
		"description": `A renowned restaurant by chef Thomas Keller, Per Se was opened in 2004 in New York. It is the chef's second three-Michelin-starred property and features his daily nine-course tasting menu and also a nine-course vegetarian tasting menu that incorporates classic French techniques and the finest of ingredients. A meal would cost one around US$ 685.`,
		"defaultPerHead": "$685",
        "image": require('../../assets/images/restaurant2.png'),
        "popular": true,
		"location": 'USA',
		"_id": 2,
		"rating": '4.9',
		"spotlight": 'Menu under $200',
		"reviews": 120,
	},
    {
		"name": "Kyo Aji, Tokyo",
		"description": `Kyo Aji in Tokyo is a revered institution known for its traditional kaiseki cuisine. Chef Kenichiro Nishi's dedication to perfection is evident in every dish, which showcases the best seasonal ingredients in their purest forms. The serene and minimalist setting enhances the focus on the exquisite flavors and textures, making dining at Kyo Aji a transcendent experience`,
		"defaultPerHead": "$600",
        "image": require('../../assets/images/restaurant4.png'),
        "popular": true,
		"location": 'Japan',
		"_id": 4,
		"rating": '4.5',
		"spotlight": 'Best in ambience',
		"reviews": 90,
	},
	{
		"name": "Per Savoy, Paris",
		"description": `Guy Savoy's flagship restaurant in Paris epitomizes French gastronomy with its luxurious setting and impeccable service. The tasting menu features signature dishes such as artichoke and black truffle soup, showcasing Savoy's mastery of classic and contemporary techniques. The elegant ambiance and exceptional wine pairings make dining at Guy Savoy a truly memorable experience.`,
		"defaultPerHead": "$615",
        "image": require('../../assets/images/restaurant3.png'),
        "popular": true,
		"location": 'France',
		"_id": 3,
		"rating": '4.2',
		"spotlight": 'Popular right now',
		"reviews": 280,
	},
    {
		"name": "Masa New York",
		"description": `The Japanese and sushi restaurant of Mara is situated in Manhattan in New York City. Founded by Chef Masa Takayama in 2004, this restaurant offers you with a dining experience that would cost you US$ 595. This doesn't include beverages and taxes. The experience lasts for an approximate 2 hours. Reservations are accepted 3 weeks prior to dining, and the menu that the guests are offered with are prepared by Chef Masa himself. It involves use of seasonal ingredients. Truffles and Kobe beef feature on this menu. Most of the fish that are offered are flown in all the way from Japan`,
		"defaultPerHead": "$595",
        "image": require('../../assets/images/restaurant5.png'),
        "popular": false,
		"location": 'USA',
		"_id": 5,
		"rating": '4.1',
		"reviews": 60,
	},
    {
		"name": "Ultraviolet By Paul Pairet",
		"description": `Ultraviolet by Paul Pairet offers a revolutionary dining experience with its single-table concept, which accommodates only ten guests per night. This immersive experience combines avant-garde cuisine with multi-sensory technology, including visual, audio, and olfactory stimuli, to enhance each course. The meticulously crafted 20-course meal takes diners through flavors, emotions, and atmospheres.`,
		"defaultPerHead": "$570",
        "image": require('../../assets/images/restaurant6.png'),
        "popular": false,
		"location": 'China',
		"_id": 6,
		"rating": '4.6',
		"reviews": 90,
	}
];

export const menuItems = [
	{
		name: 'Spring Roll',
		type: 'veg',
		_id: '345',
		rating: '4.6',
		orders: 80,
		price: 100,
		image: require('../../assets/images/item1.png'),
	},
	{
		name: 'Schezwan Noodles',
		type: 'non_veg',
		_id: '342',
		rating: '4.2',
		orders: 80,
		price: 120,
		image: require('../../assets/images/item2.png'),
	},
	{
		name: 'Fried Rice',
		type: 'veg',
		_id: '334',
		rating: '4.8',
		orders: 80,
		price: 80,
		image: require('../../assets/images/item3.png'),
	},
	{
		name: 'Chicken Rice',
		type: 'non_veg',
		_id: '394',
		rating: '4.1',
		orders: 80,
		price: 140,
		image: require('../../assets/images/item4.png'),
	},
	{
		name: 'Thai Curry',
		type: 'veg',
		_id: '354',
		rating: '4.2',
		orders: 80,
		price: 180,
		image: require('../../assets/images/item5.png'),
	},
]