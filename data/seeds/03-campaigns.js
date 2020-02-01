exports.seed = async knex => {
  await knex('campaigns').insert([
    {
      title: 'Conserving migrating raptors in western Georgia',
      description:
        'The illegal trapping and sale of birds for falconry, a traditional practice in Georgia, pose a threat to raptor species. It is estimated that 200,000 birds are trapped each year with 5,000 being smuggled out of the country. For some species, birds regarded as low quality are also killed to remove them from populations. The illegal and unsustainable trade in raptors is significantly affecting a number of species including the saker falcon, Eurasian sparrowhawk, northern goshawk and peregrine falcon, which are targeted for falconry. FFI is seeking to address these threats by working closely with falconers’ associations and in cooperation with relevant government agencies to regulate the practice of falconry and to stop illegal international trade in birds of prey.',
      photo_url:
        'https://cms.fauna-flora.org/wp-content/uploads/2017/11/conserving-migrating-raptors-in-western-georgia-2000x1200.jpg',
      location: 'Georgia, Eurasia',
      species:
        'saker falcon, Eurasian sparrowhawk, northern goshawk and peregrine falcon',
      urgency_level: 6,
      funding_goal: 10000,
      deadline: '06-01-2020',
      org_id: 1,
    },
    {
      title: 'Conserving wild pollinators and increasing food security',
      description:
        'As a society we are increasingly dependent on pollinators. The proportion of global agricultural production that depends on pollinators has increased four-fold since 1961. Much of this dependence is linked to wild pollinators. Where there are data on the status of pollinators, national or regional assessments show declines in the abundances of many wild bee and butterfly species, with a third or more facing local extinction. This could represent an unidentified risk – a pollination deficit – within agricultural supply chains. Focusing on the procurement of pollinator-dependent crops, the purpose of this project, which brings together FFI, UNEP-WCMC, the Cambridge Institute for Sustainability Leadership and the University of East Anglia, is to catalyse private sector action to support the conservation of wild pollinator populations. To date we have analysed existing company action on pollination through interviews, surveys and benchmarking, assessed the vulnerability of the top 15 pollinator food crops, strengthened the business case to act and outlined a road map to enable sustainable pollinator management within supply chains.',
      photo_url:
        'https://cms.fauna-flora.org/wp-content/uploads/2017/11/conserving-wild-pollinators-and-increasing-food-security-2000x1200.jpg',
      location: 'Worldwide',
      species: 'pollinators',
      urgency_level: 8,
      funding_goal: 12000,
      deadline: '12-31-2020',
      org_id: 1,
    },
    {
      title: 'Helping wildlife affected by fires',
      description:
        "The scale and severity of bushfires sweeping the country is currently testing the resources of wildlife rescue groups. Many groups have issued public pleas for financial support and donated goods, to help them meet the needs of native wildlife that are suffering from the impact of these fires. Wildlife rescue groups and wildlife hospitals simply cannot keep up and need extra support to help native wildlife going through this traumatic moment in history. The treatment and rehabilitation of wildlife is an intensive and a long-term process and recovery can take up to 6-9 months. Australian Wildlife Society wanted to do more to help wildlife rescue groups and native wildlife affected by the bushfires in NSW, VIC & QLD. If you have also been wanting to help, here is your chance! We are asking you to join the echidna hunt to help us raise funds for wildlife rescue groups that are rehabilitating native wildlife affected by the bushfires. Did you know that the echidna is the symbol of our Society and that the echidna is featured on the 5 cent coin? If you are interested in collecting 5 cent coins to participate in this fundraising process, please deposit the funds at your nearest Commonwealth Bank of Australia or via electronic funds transfer using the account details below. Once the coins have been banked, please let us know your details and how much has been banked (info@aws.org.au) and we will send you a tax-deductible receipt. Donations of $2 or more are fully tax-deductible. To help spread the word, share the message via your social networks and don't forget to tag us. Invite friends, colleagues and local businesses to join the echidna hunt to raise funds for wildlife affected by the bushfires.",
      photo_url:
        'https://image.cnbcfm.com/api/v1/image/106320130-1578071873589gettyimages-1187495570.jpeg',
      location: 'Australia',
      species: 'kangaroo, koala, echidna, wombat',
      urgency_level: 10,
      funding_goal: 50000,
      deadline: '05-31-2020',
      org_id: 2,
    },
    {
      title: 'Keep elephants safe from wildlife traffickers',
      description:
        'Poachers kill as many as 35,000 elephants each year for their ivory tusks and with the current poaching rates causing an 8 percent population decline each year, this iconic species could be wiped out in our lifetime. In the past few years, there has been a major movement toward a domestic ban for ivory from major consumer countries. However, other countries are lagging behind and poaching continues to ravage Africa’s threatened elephant populations. Your gift will keep elephants and other iconic species safe from the dangerous wildlife trade. African Wildlife Foundation is committed to the fight against poaching and works with people on all levels, from governments to local communities, to ensure the long-term survival of vulnerable species like the elephant. Through concerted anti-poaching efforts, 11 out of the 14 elephant populations AWF works with are now stable or increasing. Your gift with be put to use immediately to shut down domestic ivory markets, educate consumers about the true cost of buying ivory, and to ultimately stop the demand.',
      photo_url:
        'https://uploads.crowdrise.com/hero/4828c7c5185e2024010a05d41d67df66.jpg',
      location: 'Africa',
      species: 'African elephant',
      urgency_level: 8,
      funding_goal: 20000,
      deadline: '12-31-2020',
      org_id: 3,
    },
    {
      title: 'Stop the demand for rhino horn',
      description:
        'In the wild, rhinos have no natural predators — except for humans. The escalating demand for rhino horn dramatically increased poaching and rhino populations suffered tremendous losses in its wake. There are only about 25,000 rhinos in all of Africa today; black rhino populations dropped 96.7% since 1960, western black rhinos were declared extinct in 2011, and northern white rhinos are on the brink of extinction. Your gift will give rhinos a safe space to roam and help African Wildlife Foundation stop the killing of Africa’s rhinos and curb the demand for rhino horn and other illicit wildlife products. Through concerted anti-poaching efforts, 100% of rhino populations under AWF’s protection are stable or increasing. When you support AWF, you aid in the conservation and growth of critically endangered species like the black rhino.',
      photo_url:
        'https://uploads.crowdrise.com/hero/275e9c9f39acf491c02eb007b589ee74.jpg',
      location: 'Africa',
      species: 'northern white rhinoceros',
      urgency_level: 10,
      funding_goal: 30000,
      deadline: '12-31-2020',
      org_id: 3,
    },
    {
      title: 'Support the Jaguar Corridor Initiative',
      description:
        'Panthera’s Jaguar Corridor Initiative is the only conservation program that seeks to protect jaguars across their entire six million km2 range. In partnership with governments, corporations, and local communities, Panthera’s Jaguar Corridor Initiative is working to preserve the genetic integrity of the jaguar by connecting and protecting core jaguar populations in human landscapes from northern Mexico to Argentina. This is built on a multi-dimensional process. Country by country, Panthera’s scientists begin by mapping the jaguar’s presence and the corridors through which they live and move. A corridor might include a cattle ranch, a canal development, a citrus plantation, or someone’s backyard. Using these data, Panthera partners with governments and corporations to support land developments that are both economically profitable and ecologically sustainable, allowing safe passage for jaguars and other wildlife. Panthera is currently leading or supporting efforts in eleven of the 18 jaguar range states, including Belize, Brazil, Bolivia, Colombia, Costa Rica, Guatemala, Honduras, Mexico, Nicaragua, Panama, and Suriname.',
      photo_url:
        'https://dg2d3wxprq381.cloudfront.net/cms/sites/default/files/styles/max/public/header-jaguar_NMG6765.jpg',
      location: 'Central and South America',
      species: 'Jaguar',
      urgency_level: 7,
      funding_goal: 10000,
      deadline: '08-31-2020',
      org_id: 4,
    },
    {
      title: 'Support the Small Cats Program',
      description:
        'Panthera’s Small Cats Program creates targeted conservation strategies for the world’s most threatened small cat species by understanding their unique ecological needs and threats. There are 40 recognized species of wild cats in the world. Most people are familiar with the big and medium-sized species, but few can name the 33 smaller cats. Panthera’s Small Cats Program is expanding our focus in wild cat conservation to bring the increasingly threatened small cat species to the world’s attention and enact science-based conservation action on their behalf. Only a handful of studies have investigated the ecology of small cats, and subsequently, there are huge knowledge gaps about species population sizes, threats, and more. This lack of data can significantly hamper conservation action and make many highly-threatened small cat species appear as low priorities on the conservation agenda. Moreover, while some species may be considered common, little is known about how changes in land use and other threats impact them.',
      photo_url:
        'https://dg2d3wxprq381.cloudfront.net/cms/sites/default/files/styles/max/public/sNeofelis%20nebulosa%20KKOZ%20ASliwa%208-16%20IMG_1735.jpg',
      location: 'Central and South America',
      species: 'Jaguar',
      urgency_level: 6,
      funding_goal: 8000,
      deadline: '12-31-2020',
      org_id: 4,
    },
  ]);
};
