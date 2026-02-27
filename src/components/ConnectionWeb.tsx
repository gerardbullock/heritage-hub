import { useState, useMemo, useEffect } from "react";
import { X, ZoomIn } from "lucide-react";

interface WebNode {
  id: string;
  label: string;
  category: "family" | "event" | "associate" | "place" | "organization";
  image: string;
  detail: string;
  year?: string;
}

const categoryColors: Record<WebNode["category"], string> = {
  family: "hsl(340 50% 45%)",
  event: "hsl(42 85% 55%)",
  associate: "hsl(200 60% 45%)",
  place: "hsl(140 45% 40%)",
  organization: "hsl(280 40% 50%)",
};

const categoryLabels: Record<WebNode["category"], string> = {
  family: "Family",
  event: "Key Events",
  associate: "Associates",
  place: "Places",
  organization: "Organizations",
};

const categoryEmoji: Record<WebNode["category"], string> = {
  family: "👪",
  event: "📅",
  associate: "🤝",
  place: "📍",
  organization: "🏛️",
};

// Cluster positions around the center (angle in degrees, distance from center)
const clusterLayout: Record<WebNode["category"], { angle: number; dist: number }> = {
  family: { angle: 200, dist: 1.15 },
  associate: { angle: 340, dist: 1.15 },
  event: { angle: 90, dist: 1.2 },
  place: { angle: 150, dist: 1.25 },
  organization: { angle: 30, dist: 1.25 },
};

const figureWebData: Record<string, { image: string; nodes: WebNode[] }> = {
  "Martin Luther King Jr.": {
    image: "/images/mlk-jr.jpg",
    nodes: [
      { id: "birth", label: "Born Jan 15, 1929", category: "event", image: "/images/ebenezer-church.jpg", detail: "Born Michael King Jr. in Atlanta, Georgia. Later renamed Martin Luther King Jr.", year: "1929" },
      { id: "father", label: "Martin Luther King Sr.", category: "family", image: "/images/ebenezer-church.jpg", detail: "Baptist minister and civil rights activist. Pastor of Ebenezer Baptist Church for four decades." },
      { id: "mother", label: "Alberta Williams King", category: "family", image: "/images/ebenezer-church.jpg", detail: "Organist at Ebenezer Baptist Church. Assassinated in 1974 while playing the organ during a service." },
      { id: "wife", label: "Coretta Scott King", category: "family", image: "/images/march-on-washington.jpg", detail: "Civil rights leader in her own right. Continued Martin's legacy and founded the King Center in Atlanta." },
      { id: "sibling1", label: "Christine King Farris", category: "family", image: "/images/ebenezer-church.jpg", detail: "Elder sister. Professor at Spelman College and author of books about her brother." },
      { id: "sibling2", label: "A.D. King", category: "family", image: "/images/ebenezer-church.jpg", detail: "Younger brother. Baptist minister and civil rights activist. Found dead in his pool in 1969." },
      { id: "rosa", label: "Rosa Parks", category: "associate", image: "/images/montgomery-bus.jpg", detail: "Her 1955 arrest sparked the Montgomery Bus Boycott, which King led — launching him into national prominence.", year: "1955" },
      { id: "gandhi", label: "Mahatma Gandhi", category: "associate", image: "/images/gandhi.jpg", detail: "King visited India in 1959 and adopted Gandhi's nonviolent resistance philosophy as the foundation of his movement." },
      { id: "malcolm", label: "Malcolm X", category: "associate", image: "/images/malcolm-x.jpg", detail: "Ideological counterpart. Though they disagreed on methods, both fought for Black liberation. They met only once, in 1964." },
      { id: "bayard", label: "Bayard Rustin", category: "associate", image: "/images/march-on-washington.jpg", detail: "Chief strategist who organized the 1963 March on Washington and mentored King in nonviolent direct action." },
      { id: "abernathy", label: "Ralph Abernathy", category: "associate", image: "/images/selma-march.jpg", detail: "Co-founded SCLC with King. Lifelong friend and partner who was beside King when he was assassinated." },
      { id: "dream", label: "I Have a Dream", category: "event", image: "/images/march-on-washington.jpg", detail: "Delivered his iconic speech to 250,000 people at the March on Washington on August 28, 1963.", year: "1963" },
      { id: "nobel", label: "Nobel Peace Prize", category: "event", image: "/images/nobel-peace-prize.jpg", detail: "Awarded the Nobel Peace Prize in 1964 at age 35 — the youngest recipient at the time.", year: "1964" },
      { id: "selma", label: "Selma to Montgomery", category: "event", image: "/images/selma-march.jpg", detail: "Led the 1965 marches that led directly to the Voting Rights Act of 1965.", year: "1965" },
      { id: "atlanta", label: "Atlanta, Georgia", category: "place", image: "/images/atlanta-georgia.jpg", detail: "Born and raised in Atlanta. Ebenezer Baptist Church was the spiritual home of the King family." },
      { id: "sclc", label: "SCLC", category: "organization", image: "/images/sclc-mlk.png", detail: "Co-founded the Southern Christian Leadership Conference in 1957, the organizational backbone of his movement." },
    ],
  },
  "Harriet Tubman": {
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Harriet_Tubman_c1868-69_%28cropped%29.jpg/220px-Harriet_Tubman_c1868-69_%28cropped%29.jpg",
    nodes: [
      { id: "birth", label: "Born c. 1822", category: "event", image: "/images/dorchester-county.jpg", detail: "Born Araminta Ross in Dorchester County, Maryland. Exact date unknown — she was born into slavery.", year: "1822" },
      { id: "mother", label: "Harriet 'Rit' Green", category: "family", image: "/images/dorchester-county.jpg", detail: "Her enslaved mother. Tubman later rescued her parents and brought them to freedom in Auburn, New York." },
      { id: "father", label: "Ben Ross", category: "family", image: "/images/dorchester-county.jpg", detail: "Her father, an enslaved timber worker. Tubman rescued both parents in 1857." },
      { id: "husband", label: "John Tubman", category: "family", image: "/images/dorchester-county.jpg", detail: "A free Black man she married in 1844. He refused to join her escape north and later remarried." },
      { id: "escape", label: "Escape to Freedom", category: "event", image: "/images/underground-railroad.jpg", detail: "Escaped slavery in 1849, traveling nearly 90 miles on foot to Pennsylvania using the Underground Railroad.", year: "1849" },
      { id: "douglass", label: "Frederick Douglass", category: "associate", image: "/images/rochester-ny.jpg", detail: "Sheltered freedom seekers she brought north. Called her 'one of the bravest persons on this continent.'" },
      { id: "brown", label: "John Brown", category: "associate", image: "/images/underground-railroad.jpg", detail: "Called her 'General Tubman' and consulted her for his planned uprising at Harpers Ferry." },
      { id: "truth", label: "Sojourner Truth", category: "associate", image: "/images/underground-railroad.jpg", detail: "Fellow formerly enslaved woman and powerful advocate for abolition and women's rights." },
      { id: "still", label: "William Still", category: "associate", image: "/images/underground-railroad.jpg", detail: "Known as the 'Father of the Underground Railroad,' documented the freedom seekers Tubman guided to safety." },
      { id: "raid", label: "Combahee River Raid", category: "event", image: "/images/combahee-raid.jpg", detail: "Led the 1863 Combahee River Raid during the Civil War, liberating over 700 enslaved people.", year: "1863" },
      { id: "auburn", label: "Auburn, New York", category: "place", image: "/images/auburn-ny.jpg", detail: "Her home after the war. She established the Harriet Tubman Home for the Aged here." },
      { id: "ugrr", label: "Underground Railroad", category: "organization", image: "/images/underground-railroad.jpg", detail: "Made 13 rescue missions via the network of secret routes and safe houses, freeing about 70 enslaved people." },
    ],
  },
  "Maya Angelou": {
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Angelou_at_Clinton_inauguration_%28cropped_2%29.jpg/220px-Angelou_at_Clinton_inauguration_%28cropped_2%29.jpg",
    nodes: [
      { id: "birth", label: "Born Apr 4, 1928", category: "event", image: "/images/stamps-arkansas.jpg", detail: "Born Marguerite Annie Johnson in St. Louis, Missouri.", year: "1928" },
      { id: "mother", label: "Vivian Baxter Johnson", category: "family", image: "/images/stamps-arkansas.jpg", detail: "A nurse and card dealer. Their complicated relationship shaped much of Angelou's early life and writing." },
      { id: "brother", label: "Bailey Johnson Jr.", category: "family", image: "/images/stamps-arkansas.jpg", detail: "Her beloved older brother who gave her the nickname 'Maya.' Their bond was central to her childhood." },
      { id: "grandmother", label: "Annie Henderson", category: "family", image: "/images/stamps-arkansas.jpg", detail: "Called 'Momma.' Raised Maya in Stamps, Arkansas. A strong, devout woman who deeply influenced her." },
      { id: "son", label: "Guy Johnson", category: "family", image: "/images/caged-bird-sings.jpg", detail: "Her only son, born when she was 17. He became a poet and author in his own right." },
      { id: "mlk", label: "Martin Luther King Jr.", category: "associate", image: "/images/mlk-jr.jpg", detail: "Close friend. She served as Northern Coordinator for SCLC. His assassination on her birthday devastated her." },
      { id: "malcolm", label: "Malcolm X", category: "associate", image: "/images/malcolm-x.jpg", detail: "Worked closely with Malcolm X in the Organization of Afro-American Unity before his assassination in 1965." },
      { id: "baldwin", label: "James Baldwin", category: "associate", image: "/images/caged-bird-sings.jpg", detail: "Deep friendship and mutual admiration. Baldwin encouraged her to write her first autobiography." },
      { id: "book", label: "I Know Why the Caged Bird Sings", category: "event", image: "/images/caged-bird-sings.jpg", detail: "Published in 1969, this groundbreaking autobiography brought her international recognition.", year: "1969" },
      { id: "inaug", label: "Clinton Inauguration", category: "event", image: "/images/clinton-inauguration.jpg", detail: "Read 'On the Pulse of Morning' at President Clinton's 1993 inauguration — only the second poet to read at an inauguration.", year: "1993" },
      { id: "stamps", label: "Stamps, Arkansas", category: "place", image: "/images/stamps-arkansas.jpg", detail: "Childhood home, setting of her first memoir. Raised by her grandmother in this segregated Southern town." },
      { id: "medal", label: "Presidential Medal of Freedom", category: "event", image: "/images/medal-of-freedom.jpg", detail: "Awarded in 2011 by President Obama, the nation's highest civilian honor.", year: "2011" },
    ],
  },
  "Frederick Douglass": {
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Frederick_Douglass_portrait.jpg/220px-Frederick_Douglass_portrait.jpg",
    nodes: [
      { id: "birth", label: "Born c. 1818", category: "event", image: "/images/dorchester-county.jpg", detail: "Born Frederick Augustus Washington Bailey in Talbot County, Maryland. Exact date unknown.", year: "1818" },
      { id: "mother", label: "Harriet Bailey", category: "family", image: "/images/dorchester-county.jpg", detail: "His enslaved mother. She walked 12 miles at night to see him. Died when he was about 7." },
      { id: "wife1", label: "Anna Murray Douglass", category: "family", image: "/images/rochester-ny.jpg", detail: "A free Black woman who helped fund his escape. They married in 1838 and had five children." },
      { id: "sons", label: "Lewis & Frederick Jr.", category: "family", image: "/images/rochester-ny.jpg", detail: "His sons who served in the 54th Massachusetts Regiment, the famous all-Black Union Army unit." },
      { id: "escape", label: "Escape from Slavery", category: "event", image: "/images/underground-railroad.jpg", detail: "Escaped slavery in 1838 disguised as a free Black sailor, traveling by train and ferry to New York.", year: "1838" },
      { id: "narrative", label: "Published Narrative", category: "event", image: "/images/north-star.jpg", detail: "Published 'Narrative of the Life of Frederick Douglass' in 1845 — an instant bestseller.", year: "1845" },
      { id: "tubman", label: "Harriet Tubman", category: "associate", image: "/images/underground-railroad.jpg", detail: "Mutual respect and collaboration. Douglass sheltered freedom seekers Tubman brought north." },
      { id: "lincoln", label: "Abraham Lincoln", category: "associate", image: "/images/rochester-ny.jpg", detail: "Met Lincoln multiple times, advising on emancipation and recruitment of Black soldiers." },
      { id: "garrison", label: "William Lloyd Garrison", category: "associate", image: "/images/north-star.jpg", detail: "Early mentor and publisher. They later split — Douglass embraced political action while Garrison favored moral suasion." },
      { id: "brown", label: "John Brown", category: "associate", image: "/images/underground-railroad.jpg", detail: "Brown tried to recruit Douglass for the Harpers Ferry raid. Douglass declined, believing it would fail." },
      { id: "northstar", label: "The North Star", category: "organization", image: "/images/north-star.jpg", detail: "Founded his newspaper in Rochester, NY in 1847. Its motto: 'Right is of no Sex — Truth is of no Color.'", year: "1847" },
      { id: "rochester", label: "Rochester, New York", category: "place", image: "/images/rochester-ny.jpg", detail: "His home for 25 years. Published The North Star here and became a leading citizen." },
    ],
  },
  "Rosa Parks": {
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Rosaparks.jpg/220px-Rosaparks.jpg",
    nodes: [
      { id: "birth", label: "Born Feb 4, 1913", category: "event", image: "/images/tuskegee-alabama.jpg", detail: "Born Rosa Louise McCauley in Tuskegee, Alabama.", year: "1913" },
      { id: "mother", label: "Leona McCauley", category: "family", image: "/images/tuskegee-alabama.jpg", detail: "A schoolteacher who raised Rosa and her brother in Pine Level, Alabama after separating from their father." },
      { id: "husband", label: "Raymond Parks", category: "family", image: "/images/naacp.jpg", detail: "A barber and NAACP member. He supported Rosa's activism and helped with voter registration drives." },
      { id: "brother", label: "Sylvester McCauley", category: "family", image: "/images/tuskegee-alabama.jpg", detail: "Her younger brother. Served in World War II and later joined Rosa in Detroit." },
      { id: "arrest", label: "Bus Arrest", category: "event", image: "/images/montgomery-bus.jpg", detail: "On December 1, 1955, she refused to give up her seat on a Montgomery city bus, sparking the civil rights movement.", year: "1955" },
      { id: "boycott", label: "Montgomery Bus Boycott", category: "event", image: "/images/montgomery-bus.jpg", detail: "The boycott lasted 381 days and ended with the Supreme Court ruling bus segregation unconstitutional.", year: "1955" },
      { id: "mlk", label: "Martin Luther King Jr.", category: "associate", image: "/images/mlk-jr.jpg", detail: "King led the boycott sparked by Parks's arrest, launching him into national leadership." },
      { id: "nixon", label: "E.D. Nixon", category: "associate", image: "/images/naacp.jpg", detail: "Head of the local NAACP who recognized Parks's arrest as the ideal test case for challenging segregation." },
      { id: "colvin", label: "Claudette Colvin", category: "associate", image: "/images/montgomery-bus.jpg", detail: "15-year-old who refused to give up her seat 9 months before Parks. Her case was used in Browder v. Gayle." },
      { id: "clark", label: "Septima Clark", category: "associate", image: "/images/naacp.jpg", detail: "Trained Parks at the Highlander Folk School weeks before her arrest." },
      { id: "medal", label: "Congressional Gold Medal", category: "event", image: "/images/medal-of-freedom.jpg", detail: "Awarded the Congressional Gold Medal in 1999 — the highest civilian award given by Congress.", year: "1999" },
      { id: "naacp", label: "NAACP", category: "organization", image: "/images/naacp.jpg", detail: "Served as secretary of the Montgomery NAACP chapter, working on voter registration and civil rights cases." },
    ],
  },
  "W.E.B. Du Bois": {
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/W.E.B._Du_Bois_by_James_E._Purdy%2C_1907_%28cropped%29.jpg/220px-W.E.B._Du_Bois_by_James_E._Purdy%2C_1907_%28cropped%29.jpg",
    nodes: [
      { id: "birth", label: "Born Feb 23, 1868", category: "event", image: "/images/naacp.jpg", detail: "Born in Great Barrington, Massachusetts. One of the few Black residents in a predominantly white town.", year: "1868" },
      { id: "mother", label: "Mary Silvina Burghardt", category: "family", image: "/images/naacp.jpg", detail: "Raised Du Bois largely alone after his father left. She encouraged his education and academic ambition." },
      { id: "wife", label: "Nina Gomer Du Bois", category: "family", image: "/images/naacp.jpg", detail: "His first wife, married in 1896. They had two children together." },
      { id: "harvard", label: "PhD from Harvard", category: "event", image: "/images/naacp.jpg", detail: "First African American to earn a PhD from Harvard in 1895.", year: "1895" },
      { id: "souls", label: "The Souls of Black Folk", category: "event", image: "/images/north-star.jpg", detail: "Published in 1903, this landmark work introduced the concept of 'double consciousness.'", year: "1903" },
      { id: "washington", label: "Booker T. Washington", category: "associate", image: "/images/tuskegee-alabama.jpg", detail: "Ideological rival. Du Bois challenged Washington's accommodationist approach, arguing for immediate full civil rights." },
      { id: "wells", label: "Ida B. Wells", category: "associate", image: "/images/naacp.jpg", detail: "Co-founded the NAACP. Her anti-lynching crusade aligned with Du Bois's fight against systemic racism." },
      { id: "garvey", label: "Marcus Garvey", category: "associate", image: "/images/naacp.jpg", detail: "Though they clashed, both championed Pan-Africanism and shaped global Black identity." },
      { id: "hughes", label: "Langston Hughes", category: "associate", image: "/images/naacp.jpg", detail: "Du Bois published Hughes's early work in 'The Crisis' magazine, nurturing the Harlem Renaissance." },
      { id: "naacp", label: "NAACP", category: "organization", image: "/images/naacp.jpg", detail: "Co-founded the NAACP in 1909 and edited its magazine 'The Crisis' for 24 years.", year: "1909" },
      { id: "barrington", label: "Great Barrington, MA", category: "place", image: "/images/auburn-ny.jpg", detail: "His birthplace. Now home to the W.E.B. Du Bois National Historic Site." },
      { id: "ghana", label: "Ghana", category: "place", image: "/images/naacp.jpg", detail: "Moved to Ghana in 1961, became a citizen, and died there in 1963 — the day before the March on Washington." },
    ],
  },
  "Malcolm X": {
    image: "/images/malcolm-x.jpg",
    nodes: [
      { id: "birth", label: "Born May 19, 1925", category: "event", image: "/images/omaha-nebraska.jpg", detail: "Born Malcolm Little in Omaha, Nebraska. His father, a Baptist minister and Marcus Garvey follower, was killed when Malcolm was six.", year: "1925" },
      { id: "mother", label: "Louise Little", category: "family", image: "/images/omaha-nebraska.jpg", detail: "His mother, originally from Grenada. After her husband's death, she was committed to a mental institution and her children were split into foster homes." },
      { id: "betty", label: "Betty Shabazz", category: "family", image: "/images/malcolm-x.jpg", detail: "His wife, a nurse and educator. They married in 1958 and had six daughters. She carried on his legacy after his assassination." },
      { id: "daughters", label: "Attallah & Qubilah", category: "family", image: "/images/malcolm-x.jpg", detail: "His eldest daughters. Attallah became an actress and activist; Qubilah was later accused of plotting to kill Louis Farrakhan." },
      { id: "elijah", label: "Elijah Muhammad", category: "associate", image: "/images/nation-of-islam.jpg", detail: "Leader of the Nation of Islam and Malcolm's mentor. Their split in 1964 over ideology and personal conduct changed the course of history." },
      { id: "mlk", label: "Martin Luther King Jr.", category: "associate", image: "/images/mlk-jr.jpg", detail: "Ideological counterpart. They met only once, in March 1964 at the U.S. Capitol. Despite their differences, both sought Black liberation." },
      { id: "angelou", label: "Maya Angelou", category: "associate", image: "/images/caged-bird-sings.jpg", detail: "Close friend who worked with Malcolm in the Organization of Afro-American Unity. His assassination deeply affected her." },
      { id: "ali", label: "Muhammad Ali", category: "associate", image: "/images/malcolm-x.jpg", detail: "Malcolm mentored the young Cassius Clay and introduced him to the Nation of Islam. Their friendship later fractured over Malcolm's split with Elijah Muhammad." },
      { id: "noi_join", label: "Joined Nation of Islam", category: "event", image: "/images/nation-of-islam.jpg", detail: "Converted while in prison in 1948. Rose rapidly to become the Nation's most prominent spokesman, growing membership from 500 to 30,000.", year: "1952" },
      { id: "ballot", label: "The Ballot or the Bullet", category: "event", image: "/images/malcolm-x.jpg", detail: "His legendary 1964 speech urged Black Americans to exercise their right to vote — or defend themselves by any means necessary.", year: "1964" },
      { id: "hajj", label: "Pilgrimage to Mecca", category: "event", image: "/images/mecca-hajj.jpg", detail: "His 1964 Hajj transformed his worldview. Praying alongside white Muslims, he embraced a universal brotherhood that transcended race.", year: "1964" },
      { id: "assassination", label: "Assassinated Feb 1965", category: "event", image: "/images/audubon-ballroom.jpg", detail: "Shot and killed at the Audubon Ballroom in Harlem on February 21, 1965, while speaking to the Organization of Afro-American Unity.", year: "1965" },
      { id: "harlem", label: "Harlem, New York", category: "place", image: "/images/harlem-ny.jpg", detail: "His spiritual home. Minister of Temple No. 7 in Harlem, where he built the Nation of Islam's most powerful chapter." },
      { id: "omaha", label: "Omaha, Nebraska", category: "place", image: "/images/omaha-nebraska.jpg", detail: "His birthplace. The family fled after Klan threats. His childhood of displacement and racism forged his revolutionary fire." },
      { id: "noi", label: "Nation of Islam", category: "organization", image: "/images/nation-of-islam.jpg", detail: "The Black Muslim organization that gave Malcolm his platform. He built it into a national force before his bitter 1964 departure." },
      { id: "oaau", label: "OAAU", category: "organization", image: "/images/audubon-ballroom.jpg", detail: "Founded the Organization of Afro-American Unity in 1964 to internationalize the Black freedom struggle and connect it to global human rights." },
    ],
  },
  "Black Panther Party": {
    image: "/images/black-panther-party.jpg",
    nodes: [
      { id: "founded", label: "Founded Oct 1966", category: "event", image: "/images/oakland-california.jpg", detail: "Founded on October 15, 1966, in Oakland, California, as the Black Panther Party for Self-Defense.", year: "1966" },
      { id: "huey", label: "Huey P. Newton", category: "associate", image: "/images/huey-newton.jpg", detail: "Co-founder and Minister of Defense. His arrest in 1967 sparked the 'Free Huey' movement that galvanized support nationwide." },
      { id: "bobby", label: "Bobby Seale", category: "associate", image: "/images/bobby-seale.jpg", detail: "Co-founder and Chairman. Bound and gagged during the Chicago Eight trial, becoming a symbol of judicial injustice." },
      { id: "fred", label: "Fred Hampton", category: "associate", image: "/images/fred-hampton.jpg", detail: "Illinois chapter chairman. Built the Rainbow Coalition uniting diverse groups. Assassinated in his bed by police in a 1969 FBI-coordinated raid at age 21." },
      { id: "angela", label: "Angela Davis", category: "associate", image: "/images/angela-davis.jpg", detail: "Activist, scholar, and political prisoner. Her trial and acquittal became a global cause célèbre for justice." },
      { id: "eldridge", label: "Eldridge Cleaver", category: "associate", image: "/images/black-panther-party.jpg", detail: "Minister of Information and author of 'Soul on Ice.' Later fled to Algeria to escape arrest." },
      { id: "elaine", label: "Elaine Brown", category: "associate", image: "/images/black-panther-party.jpg", detail: "Chairwoman from 1974–1977, the only woman to lead the party. Expanded community programs and political campaigns." },
      { id: "breakfast", label: "Free Breakfast Program", category: "event", image: "/images/free-breakfast.jpg", detail: "Fed tens of thousands of children before school daily. So effective the federal government modeled its own program after it.", year: "1969" },
      { id: "tenpoint", label: "Ten-Point Program", category: "event", image: "/images/black-panther-party.jpg", detail: "Their founding platform demanded land, bread, housing, education, clothing, justice, and peace for Black communities.", year: "1966" },
      { id: "sacramento", label: "Sacramento Capitol March", category: "event", image: "/images/sacramento-march.jpg", detail: "In May 1967, armed Panthers entered the California State Capitol to protest the Mulford Act — drawing national attention.", year: "1967" },
      { id: "cointelpro", label: "COINTELPRO", category: "event", image: "/images/black-panther-party.jpg", detail: "The FBI's covert program targeted the Panthers with infiltration, disinformation, and assassination — J. Edgar Hoover called them the greatest threat to national security.", year: "1968" },
      { id: "oakland", label: "Oakland, California", category: "place", image: "/images/oakland-california.jpg", detail: "Birthplace and headquarters of the Party. The community programs here became a model for chapters nationwide." },
      { id: "chicago", label: "Chicago, Illinois", category: "place", image: "/images/fred-hampton.jpg", detail: "Home of Fred Hampton's powerful Illinois chapter. The Rainbow Coalition united Black, Latino, and white working-class groups." },
      { id: "sncc", label: "SNCC", category: "organization", image: "/images/march-on-washington.jpg", detail: "The Student Nonviolent Coordinating Committee collaborated with the Panthers. Stokely Carmichael briefly served as the Party's Honorary Prime Minister." },
      { id: "newspaper", label: "The Black Panther", category: "organization", image: "/images/black-panther-party.jpg", detail: "The Party's weekly newspaper reached a peak circulation of 250,000, spreading their message and revolutionary art nationwide.", year: "1967" },
    ],
  },
  "Deacons for Defense": {
    image: "/images/deacons-defense.jpg",
    nodes: [
      { id: "founded", label: "Founded Nov 1964", category: "event", image: "/images/jonesboro-louisiana.jpg", detail: "Founded in Jonesboro, Louisiana, in November 1964 by Black men who were fed up with Klan terror and police inaction.", year: "1964" },
      { id: "earnest", label: "Earnest 'Chilly Willy' Thomas", category: "associate", image: "/images/earnest-thomas.jpg", detail: "Co-founder and key organizer in Jonesboro. A Korean War veteran who applied military discipline to community defense." },
      { id: "charles", label: "Charles Sims", category: "associate", image: "/images/charles-sims.jpg", detail: "President of the Bogalusa chapter. A fearless leader who personally confronted armed Klansmen to protect CORE workers." },
      { id: "percy", label: "Percy Lee Bradford", category: "associate", image: "/images/deacons-defense.jpg", detail: "Early member and recruiter. Helped establish the organizational structure that allowed chapters to spread across the South." },
      { id: "royan", label: "Royan Burris", category: "associate", image: "/images/deacons-defense.jpg", detail: "Vice president of the Bogalusa chapter. Wounded by a sniper while guarding a civil rights march in 1965." },
      { id: "bogalusa", label: "Bogalusa Campaign", category: "event", image: "/images/bogalusa-louisiana.jpg", detail: "In 1965, the Deacons protected CORE workers in Bogalusa — a Klan stronghold and company town dominated by Crown Zellerbach paper mill.", year: "1965" },
      { id: "klan", label: "Confronting the Klan", category: "event", image: "/images/klan-confrontation.jpg", detail: "Armed patrols deterred Klan night riders from attacking Black neighborhoods. Their visible armed presence broke the Klan's reign of terror.", year: "1965" },
      { id: "charter", label: "State Charter Granted", category: "event", image: "/images/deacons-defense.jpg", detail: "Became the first armed Black self-defense organization to receive a state charter in Louisiana — a legal shield against prosecution.", year: "1965" },
      { id: "meredith", label: "Meredith March", category: "event", image: "/images/core-march.jpg", detail: "Provided armed protection for the 1966 March Against Fear after James Meredith was shot on a Mississippi highway.", year: "1966" },
      { id: "jonesboro", label: "Jonesboro, Louisiana", category: "place", image: "/images/jonesboro-louisiana.jpg", detail: "Birthplace of the Deacons. A small lumber town where Klan violence against Black residents went unchecked by local law enforcement." },
      { id: "bogalusa_place", label: "Bogalusa, Louisiana", category: "place", image: "/images/bogalusa-louisiana.jpg", detail: "Known as 'Klantown USA.' The Crown Zellerbach paper mill dominated the economy, and the Klan controlled civic life." },
      { id: "core", label: "CORE", category: "organization", image: "/images/core-march.jpg", detail: "The Congress of Racial Equality sent organizers into Louisiana. The Deacons formed specifically to protect these nonviolent workers from Klan attacks." },
      { id: "naacp_link", label: "NAACP", category: "organization", image: "/images/naacp.jpg", detail: "Worked alongside the NAACP in voter registration drives across Louisiana, providing armed escorts for canvassers in hostile territories." },
    ],
  },
};

interface ConnectionWebProps {
  figureName: string;
  onClose: () => void;
}

const ConnectionWeb = ({ figureName, onClose }: ConnectionWebProps) => {
  const [selectedNode, setSelectedNode] = useState<WebNode | null>(null);
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const data = figureWebData[figureName];

  // Group nodes by category
  const grouped = useMemo(() => {
    if (!data) return {};
    const groups: Record<string, WebNode[]> = {};
    for (const node of data.nodes) {
      if (!groups[node.category]) groups[node.category] = [];
      groups[node.category].push(node);
    }
    return groups;
  }, [data]);

  // Compute positions for each node within its cluster
  const nodeAbsolutePositions = useMemo(() => {
    const positions: Record<string, { x: number; y: number }> = {};
    const cx = 600;
    const cy = 420;

    Object.entries(grouped).forEach(([cat, nodes]) => {
      const layout = clusterLayout[cat as WebNode["category"]];
      const angleRad = (layout.angle * Math.PI) / 180;
      const clusterDist = 310 * layout.dist;
      const clusterCX = cx + clusterDist * Math.cos(angleRad);
      const clusterCY = cy + clusterDist * Math.sin(angleRad);

      // Place nodes in a mini circle within the cluster
      const count = nodes.length;
      const miniRadius = Math.max(65, count * 22);
      nodes.forEach((node, i) => {
        const a = (i / count) * 2 * Math.PI - Math.PI / 2;
        positions[node.id] = {
          x: clusterCX + miniRadius * Math.cos(a),
          y: clusterCY + miniRadius * Math.sin(a),
        };
      });
    });

    return positions;
  }, [grouped]);

  if (!data) return null;

  const handleImageError = (id: string) => {
    setImageErrors((prev) => new Set(prev).add(id));
  };

  const centerX = 600;
  const centerY = 420;

  // Line style per category (inspired by the ecomap legend)
  const lineStyles: Record<WebNode["category"], { dasharray: string; width: number }> = {
    family: { dasharray: "", width: 2.5 },
    associate: { dasharray: "6 3", width: 2 },
    event: { dasharray: "2 2", width: 1.5 },
    place: { dasharray: "8 4 2 4", width: 1.5 },
    organization: { dasharray: "4 2", width: 2 },
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col">
      <div
        className="absolute inset-0 bg-background/97 backdrop-blur-lg animate-fade-in"
        onClick={onClose}
      />

      {/* Slim sticky top bar */}
      <div className="relative z-20 flex items-center justify-between px-4 py-2 bg-card/60 backdrop-blur-md border-b border-border/30">
        <div className="flex items-center gap-2">
          {Object.entries(categoryLabels).map(([key, label]) => {
            const style = lineStyles[key as WebNode["category"]];
            return (
              <div key={key} className="flex items-center gap-1 opacity-70">
                <svg width="16" height="4">
                  <line
                    x1="0" y1="2" x2="16" y2="2"
                    stroke={categoryColors[key as WebNode["category"]]}
                    strokeWidth={style.width}
                    strokeDasharray={style.dasharray}
                  />
                </svg>
                <span className="text-muted-foreground text-[10px] font-body">{label}</span>
              </div>
            );
          })}
        </div>
        <button
          onClick={onClose}
          className="p-1.5 rounded-full hover:bg-secondary transition-all text-muted-foreground hover:text-foreground"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Scrollable content area */}
      <div className="relative z-10 flex-1 overflow-auto flex flex-col items-center px-4 md:px-12 lg:px-20 pt-6 pb-12">
        {/* Title */}
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground text-center mb-8">
          {figureName}
        </h1>

        {/* Ecomap SVG — generous panel */}
        <div className="relative w-full mx-auto rounded-2xl bg-card/40 border border-border/30 backdrop-blur-sm p-4 md:p-8" style={{ maxWidth: 1100 }}>
          <svg viewBox="0 0 1200 840" className="w-full h-auto" style={{ minHeight: '60vh' }}>
            {/* Cluster ovals */}
            {Object.entries(grouped).map(([cat, nodes]) => {
              const layout = clusterLayout[cat as WebNode["category"]];
              const angleRad = (layout.angle * Math.PI) / 180;
              const clusterDist = 310 * layout.dist;
              const cx = centerX + clusterDist * Math.cos(angleRad);
              const cy = centerY + clusterDist * Math.sin(angleRad);
              const count = nodes.length;
              const r = Math.max(100, count * 28);
              const color = categoryColors[cat as WebNode["category"]];

              return (
                <g key={`cluster-${cat}`}>
                  <ellipse
                    cx={cx}
                    cy={cy}
                    rx={r + 30}
                    ry={r + 10}
                    fill={`${color}08`}
                    stroke={color}
                    strokeWidth="1.5"
                    strokeOpacity="0.35"
                    
                  />
                  <text
                    x={cx}
                    y={cy - r - 6}
                    textAnchor="middle"
                    fill={color}
                    fontSize="18"
                    fontWeight="700"
                    fontFamily="'Playfair Display', serif"
                  >
                    {categoryLabels[cat as WebNode["category"]]}
                  </text>
                </g>
              );
            })}

            {/* Connection lines from center to each node */}
            {Object.entries(grouped).map(([cat, nodes]) =>
              nodes.map((node) => {
                const pos = nodeAbsolutePositions[node.id];
                if (!pos) return null;
                const style = lineStyles[cat as WebNode["category"]];
                const isSelected = selectedNode?.id === node.id;
                return (
                  <line
                    key={`line-${node.id}`}
                    x1={centerX}
                    y1={centerY}
                    x2={pos.x}
                    y2={pos.y}
                    stroke={categoryColors[cat as WebNode["category"]]}
                    strokeWidth={isSelected ? style.width + 1 : style.width}
                    strokeDasharray={style.dasharray}
                    strokeOpacity={isSelected ? 0.9 : 0.4}
                    className="transition-all duration-300"
                  />
                );
              })
            )}

            {/* Center node */}
            <circle
              cx={centerX}
              cy={centerY}
              r="90"
              fill="hsl(42 85% 55%)"
              stroke="hsl(42 90% 65%)"
              strokeWidth="5"
            />
            <clipPath id="center-clip">
              <circle cx={centerX} cy={centerY} r="86" />
            </clipPath>
            <image
              href={data.image}
              x={centerX - 86}
              y={centerY - 86}
              width="172"
              height="172"
              clipPath="url(#center-clip)"
              preserveAspectRatio="xMidYMid slice"
            />
            {/* Center overlay with name */}
            <circle
              cx={centerX}
              cy={centerY}
              r="86"
              fill="hsl(30 10% 8% / 0.35)"
            />
            <text
              x={centerX}
              y={centerY + 2}
              textAnchor="middle"
              dominantBaseline="middle"
              fill="hsl(40 30% 95%)"
              fontSize="20"
              fontWeight="700"
              fontFamily="'Playfair Display', serif"
            >
              {figureName.split(" ").length > 2
                ? figureName.split(" ").slice(0, -1).join(" ")
                : figureName.split(" ")[0]}
            </text>
            <text
              x={centerX}
              y={centerY + 24}
              textAnchor="middle"
              dominantBaseline="middle"
              fill="hsl(40 30% 95%)"
              fontSize="20"
              fontWeight="700"
              fontFamily="'Playfair Display', serif"
            >
              {figureName.split(" ").length > 2
                ? figureName.split(" ").slice(-1)[0]
                : figureName.split(" ")[1] || ""}
            </text>

            {/* Nodes */}
            {Object.entries(grouped).map(([cat, nodes]) =>
              nodes.map((node) => {
                const pos = nodeAbsolutePositions[node.id];
                if (!pos) return null;
                const color = categoryColors[cat as WebNode["category"]];
                const isSelected = selectedNode?.id === node.id;
                const nodeR = isSelected ? 44 : 36;
                const hasError = imageErrors.has(node.id);

                return (
                  <g
                    key={node.id}
                    onClick={() => setSelectedNode(isSelected ? null : node)}
                    className="cursor-pointer"
                    style={{ transition: "transform 0.3s" }}
                  >
                    <circle
                      cx={pos.x}
                      cy={pos.y}
                      r={nodeR + 2}
                      fill={color}
                      fillOpacity={isSelected ? 0.3 : 0.15}
                      stroke={color}
                      strokeWidth={isSelected ? 2.5 : 1.5}
                      strokeOpacity={isSelected ? 1 : 0.6}
                    />
                    {!hasError ? (
                      <>
                        <clipPath id={`clip-${node.id}`}>
                          <circle cx={pos.x} cy={pos.y} r={nodeR} />
                        </clipPath>
                        <image
                          href={node.image}
                          x={pos.x - nodeR}
                          y={pos.y - nodeR}
                          width={nodeR * 2}
                          height={nodeR * 2}
                          clipPath={`url(#clip-${node.id})`}
                          preserveAspectRatio="xMidYMid slice"
                          onError={() => handleImageError(node.id)}
                        />
                        <circle
                          cx={pos.x}
                          cy={pos.y}
                          r={nodeR}
                          fill="hsl(30 10% 8% / 0.5)"
                        />
                      </>
                    ) : (
                      <circle
                        cx={pos.x}
                        cy={pos.y}
                        r={nodeR}
                        fill={color}
                        fillOpacity="0.25"
                      />
                    )}

                    {/* Label inside node */}
                    <text
                      x={pos.x}
                      y={pos.y}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fill="hsl(40 30% 95%)"
                      fontSize={node.label.length > 18 ? "10" : node.label.length > 12 ? "11.5" : "13"}
                      fontWeight="600"
                      fontFamily="'DM Sans', sans-serif"
                    >
                      {node.label.length > 22
                        ? node.label.slice(0, 20) + "…"
                        : node.label}
                    </text>

                    {/* Year badge */}
                    {node.year && (
                      <>
                        <rect
                          x={pos.x - 16}
                          y={pos.y + nodeR}
                          width="32"
                          height="14"
                          rx="7"
                          fill={color}
                        />
                        <text
                          x={pos.x}
                          y={pos.y + nodeR + 7}
                          textAnchor="middle"
                          dominantBaseline="middle"
                          fill="hsl(40 30% 95%)"
                          fontSize="10"
                          fontWeight="700"
                          fontFamily="'DM Sans', sans-serif"
                        >
                          {node.year}
                        </text>
                      </>
                    )}
                  </g>
                );
              })
            )}
          </svg>
        </div>

        {/* Detail panel */}
        {selectedNode && (
          <div className="mt-4 w-full bg-card border border-border rounded-xl overflow-hidden animate-scale-in shadow-gold">
            {/* Large image banner with zoom animation */}
            <div
              className="relative w-full h-[28rem] overflow-hidden cursor-pointer group"
              onClick={() => setLightboxOpen(true)}
              style={{ borderBottom: `3px solid ${categoryColors[selectedNode.category]}` }}
            >
              {!imageErrors.has(selectedNode.id) ? (
                <img
                  src={selectedNode.image}
                  alt={selectedNode.label}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out scale-110 group-hover:scale-125 animate-[zoomIn_0.8s_ease-out_forwards]"
                  style={{ transformOrigin: 'center center' }}
                  onError={() => handleImageError(selectedNode.id)}
                />
              ) : (
                <div
                  className="w-full h-full flex items-center justify-center"
                  style={{ backgroundColor: categoryColors[selectedNode.category] }}
                >
                  <span className="text-5xl">{categoryEmoji[selectedNode.category]}</span>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-card via-card/60 to-transparent" />
              {/* Zoom hint */}
              <div className="absolute top-3 right-3 bg-background/70 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <ZoomIn className="w-5 h-5 text-foreground" />
              </div>
              <div className="absolute bottom-3 left-5 right-5 animate-fade-in" style={{ animationDelay: '0.3s', animationFillMode: 'both' }}>
                <div className="flex items-center gap-2">
                  <h4 className="font-display font-bold text-foreground text-2xl drop-shadow-lg">
                    {selectedNode.label}
                  </h4>
                  {selectedNode.year && (
                    <span className="text-sm font-body bg-primary/20 text-primary px-2.5 py-0.5 rounded-full">
                      {selectedNode.year}
                    </span>
                  )}
                </div>
                <span
                  className="inline-block text-xs font-body uppercase tracking-wider mt-1 px-2.5 py-1 rounded-full"
                  style={{
                    backgroundColor: categoryColors[selectedNode.category] + "30",
                    color: categoryColors[selectedNode.category],
                  }}
                >
                  {categoryLabels[selectedNode.category]}
                </span>
              </div>
            </div>
            <div className="p-5">
              <p className="text-muted-foreground font-body text-base leading-relaxed">
                {selectedNode.detail}
              </p>
            </div>
          </div>
        )}

      {/* Fullscreen lightbox */}
        {lightboxOpen && selectedNode && (
          <div
            className="fixed inset-0 z-[9999] bg-black/90 backdrop-blur-sm flex items-center justify-center animate-fade-in cursor-pointer"
            onClick={() => setLightboxOpen(false)}
          >
            <button
              className="absolute top-5 right-5 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full p-2 transition-colors z-10"
              onClick={(e) => { e.stopPropagation(); setLightboxOpen(false); }}
              aria-label="Close lightbox"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center z-10">
              <h3 className="font-display text-white text-2xl font-bold drop-shadow-lg">{selectedNode.label}</h3>
              {selectedNode.year && (
                <span className="text-sm text-primary font-body">{selectedNode.year}</span>
              )}
            </div>
            {!imageErrors.has(selectedNode.id) ? (
              <img
                src={selectedNode.image}
                alt={selectedNode.label}
                className="max-w-[95vw] max-h-[90vh] object-contain animate-scale-in drop-shadow-2xl rounded-lg"
                onClick={(e) => e.stopPropagation()}
              />
            ) : (
              <div
                className="w-64 h-64 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: categoryColors[selectedNode.category] }}
              >
                <span className="text-7xl">{categoryEmoji[selectedNode.category]}</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ConnectionWeb;
