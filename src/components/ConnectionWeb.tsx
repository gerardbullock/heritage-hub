import { useState, useMemo } from "react";
import { X } from "lucide-react";

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
  event: "Key Event",
  associate: "Associate",
  place: "Place",
  organization: "Organization",
};

const figureWebData: Record<string, { image: string; nodes: WebNode[] }> = {
  "Martin Luther King Jr.": {
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Martin_Luther_King%2C_Jr..jpg/220px-Martin_Luther_King%2C_Jr..jpg",
    nodes: [
      { id: "birth", label: "Born Jan 15, 1929", category: "event", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Ebenezer_Baptist_Church.jpg/220px-Ebenezer_Baptist_Church.jpg", detail: "Born Michael King Jr. in Atlanta, Georgia. Later renamed Martin Luther King Jr.", year: "1929" },
      { id: "father", label: "Martin Luther King Sr.", category: "family", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Martin_Luther_King%2C_Sr._%281957%29.jpg/220px-Martin_Luther_King%2C_Sr._%281957%29.jpg", detail: "Baptist minister and civil rights activist. Pastor of Ebenezer Baptist Church for four decades." },
      { id: "mother", label: "Alberta Williams King", category: "family", image: "https://upload.wikimedia.org/wikipedia/en/d/d5/Alberta_Williams_King.jpg", detail: "Organist at Ebenezer Baptist Church. Assassinated in 1974 while playing the organ during a service." },
      { id: "wife", label: "Coretta Scott King", category: "family", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Coretta_Scott_King_March_on_Washington.jpg/220px-Coretta_Scott_King_March_on_Washington.jpg", detail: "Civil rights leader in her own right. Continued Martin's legacy and founded the King Center in Atlanta." },
      { id: "sibling1", label: "Christine King Farris", category: "family", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Christine_King_Farris_01.jpg/220px-Christine_King_Farris_01.jpg", detail: "Elder sister. Professor at Spelman College and author of books about her brother." },
      { id: "sibling2", label: "A.D. King", category: "family", image: "https://upload.wikimedia.org/wikipedia/en/7/7f/Alfred_Daniel_Williams_King.jpg", detail: "Younger brother. Baptist minister and civil rights activist. Found dead in his pool in 1969." },
      { id: "rosa", label: "Rosa Parks", category: "associate", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Rosaparks.jpg/220px-Rosaparks.jpg", detail: "Her 1955 arrest sparked the Montgomery Bus Boycott, which King led — launching him into national prominence.", year: "1955" },
      { id: "gandhi", label: "Mahatma Gandhi", category: "associate", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Mahatma-Gandhi%2C_studio%2C_1931.jpg/220px-Mahatma-Gandhi%2C_studio%2C_1931.jpg", detail: "King visited India in 1959 and adopted Gandhi's nonviolent resistance philosophy as the foundation of his movement." },
      { id: "malcolm", label: "Malcolm X", category: "associate", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Malcolm_X_NYWTS_4.jpg/220px-Malcolm_X_NYWTS_4.jpg", detail: "Ideological counterpart. Though they disagreed on methods, both fought for Black liberation. They met only once, in 1964." },
      { id: "bayard", label: "Bayard Rustin", category: "associate", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Bayard_Rustin_1963.jpg/220px-Bayard_Rustin_1963.jpg", detail: "Chief strategist who organized the 1963 March on Washington and mentored King in nonviolent direct action." },
      { id: "abernathy", label: "Ralph Abernathy", category: "associate", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Ralph_Abernathy.jpg/220px-Ralph_Abernathy.jpg", detail: "Co-founded SCLC with King. Lifelong friend and partner who was beside King when he was assassinated." },
      { id: "dream", label: "I Have a Dream", category: "event", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/March_on_washington_Aug_28_1963.jpg/220px-March_on_washington_Aug_28_1963.jpg", detail: "Delivered his iconic speech to 250,000 people at the March on Washington on August 28, 1963.", year: "1963" },
      { id: "nobel", label: "Nobel Peace Prize", category: "event", image: "https://upload.wikimedia.org/wikipedia/en/thumb/e/ed/Nobel_Prize.png/220px-Nobel_Prize.png", detail: "Awarded the Nobel Peace Prize in 1964 at age 35 — the youngest recipient at the time.", year: "1964" },
      { id: "selma", label: "Selma to Montgomery", category: "event", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Bloody_Sunday-officers_await_marchers.jpeg/220px-Bloody_Sunday-officers_await_marchers.jpeg", detail: "Led the 1965 marches that led directly to the Voting Rights Act of 1965.", year: "1965" },
      { id: "atlanta", label: "Atlanta, Georgia", category: "place", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Ebenezer_Baptist_Church.jpg/220px-Ebenezer_Baptist_Church.jpg", detail: "Born and raised in Atlanta. Ebenezer Baptist Church was the spiritual home of the King family." },
      { id: "sclc", label: "SCLC", category: "organization", image: "https://upload.wikimedia.org/wikipedia/en/thumb/8/8c/SCLC_seal.png/220px-SCLC_seal.png", detail: "Co-founded the Southern Christian Leadership Conference in 1957, the organizational backbone of his movement." },
    ],
  },
  "Harriet Tubman": {
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Harriet_Tubman_c1868-69_%28cropped%29.jpg/220px-Harriet_Tubman_c1868-69_%28cropped%29.jpg",
    nodes: [
      { id: "birth", label: "Born c. 1822", category: "event", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Dorchester_County_Maryland.jpg/220px-Dorchester_County_Maryland.jpg", detail: "Born Araminta Ross in Dorchester County, Maryland. Exact date unknown — she was born into slavery.", year: "1822" },
      { id: "mother", label: "Harriet 'Rit' Green", category: "family", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Harriet_Tubman_c1868-69_%28cropped%29.jpg/220px-Harriet_Tubman_c1868-69_%28cropped%29.jpg", detail: "Her enslaved mother. Tubman later rescued her parents and brought them to freedom in Auburn, New York." },
      { id: "father", label: "Ben Ross", category: "family", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Harriet_Tubman_c1868-69_%28cropped%29.jpg/220px-Harriet_Tubman_c1868-69_%28cropped%29.jpg", detail: "Her father, an enslaved timber worker. Tubman rescued both parents in 1857." },
      { id: "husband", label: "John Tubman", category: "family", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Harriet_Tubman_c1868-69_%28cropped%29.jpg/220px-Harriet_Tubman_c1868-69_%28cropped%29.jpg", detail: "A free Black man she married in 1844. He refused to join her escape north and later remarried." },
      { id: "escape", label: "Escape to Freedom", category: "event", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Undergroundrailroad.png/220px-Undergroundrailroad.png", detail: "Escaped slavery in 1849, traveling nearly 90 miles on foot to Pennsylvania using the Underground Railroad.", year: "1849" },
      { id: "douglass", label: "Frederick Douglass", category: "associate", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Frederick_Douglass_portrait.jpg/220px-Frederick_Douglass_portrait.jpg", detail: "Sheltered freedom seekers she brought north. Called her 'one of the bravest persons on this continent.'" },
      { id: "brown", label: "John Brown", category: "associate", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/John_Brown_portrait%2C_1859.jpg/220px-John_Brown_portrait%2C_1859.jpg", detail: "Called her 'General Tubman' and consulted her for his planned uprising at Harpers Ferry." },
      { id: "truth", label: "Sojourner Truth", category: "associate", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Sojourner_truth_c1870.jpg/220px-Sojourner_truth_c1870.jpg", detail: "Fellow formerly enslaved woman and powerful advocate for abolition and women's rights." },
      { id: "still", label: "William Still", category: "associate", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/William_Still.jpg/220px-William_Still.jpg", detail: "Known as the 'Father of the Underground Railroad,' documented the freedom seekers Tubman guided to safety." },
      { id: "raid", label: "Combahee River Raid", category: "event", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/March_on_washington_Aug_28_1963.jpg/220px-March_on_washington_Aug_28_1963.jpg", detail: "Led the 1863 Combahee River Raid during the Civil War, liberating over 700 enslaved people.", year: "1863" },
      { id: "auburn", label: "Auburn, New York", category: "place", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Undergroundrailroad.png/220px-Undergroundrailroad.png", detail: "Her home after the war. She established the Harriet Tubman Home for the Aged here." },
      { id: "ugrr", label: "Underground Railroad", category: "organization", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Undergroundrailroad.png/220px-Undergroundrailroad.png", detail: "Made 13 rescue missions via the network of secret routes and safe houses, freeing about 70 enslaved people." },
    ],
  },
  "Maya Angelou": {
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Angelou_at_Clinton_inauguration_%28cropped_2%29.jpg/220px-Angelou_at_Clinton_inauguration_%28cropped_2%29.jpg",
    nodes: [
      { id: "birth", label: "Born Apr 4, 1928", category: "event", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Angelou_at_Clinton_inauguration_%28cropped_2%29.jpg/220px-Angelou_at_Clinton_inauguration_%28cropped_2%29.jpg", detail: "Born Marguerite Annie Johnson in St. Louis, Missouri.", year: "1928" },
      { id: "mother", label: "Vivian Baxter Johnson", category: "family", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Angelou_at_Clinton_inauguration_%28cropped_2%29.jpg/220px-Angelou_at_Clinton_inauguration_%28cropped_2%29.jpg", detail: "A nurse and card dealer. Their complicated relationship shaped much of Angelou's early life and writing." },
      { id: "brother", label: "Bailey Johnson Jr.", category: "family", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Angelou_at_Clinton_inauguration_%28cropped_2%29.jpg/220px-Angelou_at_Clinton_inauguration_%28cropped_2%29.jpg", detail: "Her beloved older brother who gave her the nickname 'Maya.' Their bond was central to her childhood." },
      { id: "grandmother", label: "Annie Henderson", category: "family", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Angelou_at_Clinton_inauguration_%28cropped_2%29.jpg/220px-Angelou_at_Clinton_inauguration_%28cropped_2%29.jpg", detail: "Called 'Momma.' Raised Maya in Stamps, Arkansas. A strong, devout woman who deeply influenced her." },
      { id: "son", label: "Guy Johnson", category: "family", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Angelou_at_Clinton_inauguration_%28cropped_2%29.jpg/220px-Angelou_at_Clinton_inauguration_%28cropped_2%29.jpg", detail: "Her only son, born when she was 17. He became a poet and author in his own right." },
      { id: "mlk", label: "Martin Luther King Jr.", category: "associate", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Martin_Luther_King%2C_Jr..jpg/220px-Martin_Luther_King%2C_Jr..jpg", detail: "Close friend. She served as Northern Coordinator for SCLC. His assassination on her birthday devastated her." },
      { id: "malcolm", label: "Malcolm X", category: "associate", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Malcolm_X_NYWTS_4.jpg/220px-Malcolm_X_NYWTS_4.jpg", detail: "Worked closely with Malcolm X in the Organization of Afro-American Unity before his assassination in 1965." },
      { id: "baldwin", label: "James Baldwin", category: "associate", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/James_Baldwin_37_Allan_Warren_%28cropped%29.jpg/220px-James_Baldwin_37_Allan_Warren_%28cropped%29.jpg", detail: "Deep friendship and mutual admiration. Baldwin encouraged her to write her first autobiography." },
      { id: "book", label: "I Know Why the Caged Bird Sings", category: "event", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Angelou_at_Clinton_inauguration_%28cropped_2%29.jpg/220px-Angelou_at_Clinton_inauguration_%28cropped_2%29.jpg", detail: "Published in 1969, this groundbreaking autobiography brought her international recognition.", year: "1969" },
      { id: "inaug", label: "Clinton Inauguration", category: "event", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Angelou_at_Clinton_inauguration_%28cropped_2%29.jpg/220px-Angelou_at_Clinton_inauguration_%28cropped_2%29.jpg", detail: "Read 'On the Pulse of Morning' at President Clinton's 1993 inauguration — only the second poet to read at an inauguration.", year: "1993" },
      { id: "stamps", label: "Stamps, Arkansas", category: "place", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Angelou_at_Clinton_inauguration_%28cropped_2%29.jpg/220px-Angelou_at_Clinton_inauguration_%28cropped_2%29.jpg", detail: "Childhood home, setting of her first memoir. Raised by her grandmother in this segregated Southern town." },
      { id: "medal", label: "Presidential Medal of Freedom", category: "event", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Presidential_Medal_of_Freedom_%28ribbon%29.png/220px-Presidential_Medal_of_Freedom_%28ribbon%29.png", detail: "Awarded in 2011 by President Obama, the nation's highest civilian honor.", year: "2011" },
    ],
  },
  "Frederick Douglass": {
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Frederick_Douglass_portrait.jpg/220px-Frederick_Douglass_portrait.jpg",
    nodes: [
      { id: "birth", label: "Born c. 1818", category: "event", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Frederick_Douglass_portrait.jpg/220px-Frederick_Douglass_portrait.jpg", detail: "Born Frederick Augustus Washington Bailey in Talbot County, Maryland. Exact date unknown.", year: "1818" },
      { id: "mother", label: "Harriet Bailey", category: "family", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Frederick_Douglass_portrait.jpg/220px-Frederick_Douglass_portrait.jpg", detail: "His enslaved mother. She walked 12 miles at night to see him. Died when he was about 7." },
      { id: "wife1", label: "Anna Murray Douglass", category: "family", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Frederick_Douglass_portrait.jpg/220px-Frederick_Douglass_portrait.jpg", detail: "A free Black woman who helped fund his escape. They married in 1838 and had five children." },
      { id: "sons", label: "Lewis & Frederick Jr.", category: "family", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Frederick_Douglass_portrait.jpg/220px-Frederick_Douglass_portrait.jpg", detail: "His sons who served in the 54th Massachusetts Regiment, the famous all-Black Union Army unit." },
      { id: "escape", label: "Escape from Slavery", category: "event", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Frederick_Douglass_portrait.jpg/220px-Frederick_Douglass_portrait.jpg", detail: "Escaped slavery in 1838 disguised as a free Black sailor, traveling by train and ferry to New York.", year: "1838" },
      { id: "narrative", label: "Published Narrative", category: "event", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Frederick_Douglass_portrait.jpg/220px-Frederick_Douglass_portrait.jpg", detail: "Published 'Narrative of the Life of Frederick Douglass' in 1845 — an instant bestseller.", year: "1845" },
      { id: "tubman", label: "Harriet Tubman", category: "associate", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Harriet_Tubman_c1868-69_%28cropped%29.jpg/220px-Harriet_Tubman_c1868-69_%28cropped%29.jpg", detail: "Mutual respect and collaboration. Douglass sheltered freedom seekers Tubman brought north." },
      { id: "lincoln", label: "Abraham Lincoln", category: "associate", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Abraham_Lincoln_O-77_matte_collodion_print.jpg/220px-Abraham_Lincoln_O-77_matte_collodion_print.jpg", detail: "Met Lincoln multiple times, advising on emancipation and recruitment of Black soldiers." },
      { id: "garrison", label: "William Lloyd Garrison", category: "associate", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/William_Lloyd_Garrison_by_Jocelyn%2C_1833.jpg/220px-William_Lloyd_Garrison_by_Jocelyn%2C_1833.jpg", detail: "Early mentor and publisher. They later split — Douglass embraced political action while Garrison favored moral suasion." },
      { id: "brown", label: "John Brown", category: "associate", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/John_Brown_portrait%2C_1859.jpg/220px-John_Brown_portrait%2C_1859.jpg", detail: "Brown tried to recruit Douglass for the Harpers Ferry raid. Douglass declined, believing it would fail." },
      { id: "northstar", label: "The North Star", category: "organization", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Frederick_Douglass_portrait.jpg/220px-Frederick_Douglass_portrait.jpg", detail: "Founded his newspaper in Rochester, NY in 1847. Its motto: 'Right is of no Sex — Truth is of no Color.'", year: "1847" },
      { id: "rochester", label: "Rochester, New York", category: "place", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Frederick_Douglass_portrait.jpg/220px-Frederick_Douglass_portrait.jpg", detail: "His home for 25 years. Published The North Star here and became a leading citizen." },
    ],
  },
  "Rosa Parks": {
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Rosaparks.jpg/220px-Rosaparks.jpg",
    nodes: [
      { id: "birth", label: "Born Feb 4, 1913", category: "event", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Rosaparks.jpg/220px-Rosaparks.jpg", detail: "Born Rosa Louise McCauley in Tuskegee, Alabama.", year: "1913" },
      { id: "mother", label: "Leona McCauley", category: "family", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Rosaparks.jpg/220px-Rosaparks.jpg", detail: "A schoolteacher who raised Rosa and her brother in Pine Level, Alabama after separating from their father." },
      { id: "husband", label: "Raymond Parks", category: "family", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Rosaparks.jpg/220px-Rosaparks.jpg", detail: "A barber and NAACP member. He supported Rosa's activism and helped with voter registration drives." },
      { id: "brother", label: "Sylvester McCauley", category: "family", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Rosaparks.jpg/220px-Rosaparks.jpg", detail: "Her younger brother. Served in World War II and later joined Rosa in Detroit." },
      { id: "arrest", label: "Bus Arrest", category: "event", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Rosaparks.jpg/220px-Rosaparks.jpg", detail: "On December 1, 1955, she refused to give up her seat on a Montgomery city bus, sparking the civil rights movement.", year: "1955" },
      { id: "boycott", label: "Montgomery Bus Boycott", category: "event", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Rosaparks.jpg/220px-Rosaparks.jpg", detail: "The boycott lasted 381 days and ended with the Supreme Court ruling bus segregation unconstitutional.", year: "1955" },
      { id: "mlk", label: "Martin Luther King Jr.", category: "associate", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Martin_Luther_King%2C_Jr..jpg/220px-Martin_Luther_King%2C_Jr..jpg", detail: "King led the boycott sparked by Parks's arrest, launching him into national leadership." },
      { id: "nixon", label: "E.D. Nixon", category: "associate", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Rosaparks.jpg/220px-Rosaparks.jpg", detail: "Head of the local NAACP who recognized Parks's arrest as the ideal test case for challenging segregation." },
      { id: "colvin", label: "Claudette Colvin", category: "associate", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Rosaparks.jpg/220px-Rosaparks.jpg", detail: "15-year-old who refused to give up her seat 9 months before Parks. Her case was used in Browder v. Gayle." },
      { id: "clark", label: "Septima Clark", category: "associate", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Rosaparks.jpg/220px-Rosaparks.jpg", detail: "Trained Parks at the Highlander Folk School weeks before her arrest." },
      { id: "medal", label: "Congressional Gold Medal", category: "event", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Rosaparks.jpg/220px-Rosaparks.jpg", detail: "Awarded the Congressional Gold Medal in 1999 — the highest civilian award given by Congress.", year: "1999" },
      { id: "naacp", label: "NAACP", category: "organization", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Rosaparks.jpg/220px-Rosaparks.jpg", detail: "Served as secretary of the Montgomery NAACP chapter, working on voter registration and civil rights cases." },
    ],
  },
  "W.E.B. Du Bois": {
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/W.E.B._Du_Bois_by_James_E._Purdy%2C_1907_%28cropped%29.jpg/220px-W.E.B._Du_Bois_by_James_E._Purdy%2C_1907_%28cropped%29.jpg",
    nodes: [
      { id: "birth", label: "Born Feb 23, 1868", category: "event", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/W.E.B._Du_Bois_by_James_E._Purdy%2C_1907_%28cropped%29.jpg/220px-W.E.B._Du_Bois_by_James_E._Purdy%2C_1907_%28cropped%29.jpg", detail: "Born in Great Barrington, Massachusetts. One of the few Black residents in a predominantly white town.", year: "1868" },
      { id: "mother", label: "Mary Silvina Burghardt", category: "family", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/W.E.B._Du_Bois_by_James_E._Purdy%2C_1907_%28cropped%29.jpg/220px-W.E.B._Du_Bois_by_James_E._Purdy%2C_1907_%28cropped%29.jpg", detail: "Raised Du Bois largely alone after his father left. She encouraged his education and academic ambition." },
      { id: "wife", label: "Nina Gomer Du Bois", category: "family", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/W.E.B._Du_Bois_by_James_E._Purdy%2C_1907_%28cropped%29.jpg/220px-W.E.B._Du_Bois_by_James_E._Purdy%2C_1907_%28cropped%29.jpg", detail: "His first wife, married in 1896. They had two children together." },
      { id: "harvard", label: "PhD from Harvard", category: "event", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/W.E.B._Du_Bois_by_James_E._Purdy%2C_1907_%28cropped%29.jpg/220px-W.E.B._Du_Bois_by_James_E._Purdy%2C_1907_%28cropped%29.jpg", detail: "First African American to earn a PhD from Harvard in 1895.", year: "1895" },
      { id: "souls", label: "The Souls of Black Folk", category: "event", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/W.E.B._Du_Bois_by_James_E._Purdy%2C_1907_%28cropped%29.jpg/220px-W.E.B._Du_Bois_by_James_E._Purdy%2C_1907_%28cropped%29.jpg", detail: "Published in 1903, this landmark work introduced the concept of 'double consciousness.'", year: "1903" },
      { id: "washington", label: "Booker T. Washington", category: "associate", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Booker_T_Washington_retouched_flattened-crop.jpg/220px-Booker_T_Washington_retouched_flattened-crop.jpg", detail: "Ideological rival. Du Bois challenged Washington's accommodationist approach, arguing for immediate full civil rights." },
      { id: "wells", label: "Ida B. Wells", category: "associate", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Ida_B._Wells-Barnett_-_Original.jpg/220px-Ida_B._Wells-Barnett_-_Original.jpg", detail: "Co-founded the NAACP. Her anti-lynching crusade aligned with Du Bois's fight against systemic racism." },
      { id: "garvey", label: "Marcus Garvey", category: "associate", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Marcus_Garvey_1924-08-05.jpg/220px-Marcus_Garvey_1924-08-05.jpg", detail: "Though they clashed, both championed Pan-Africanism and shaped global Black identity." },
      { id: "hughes", label: "Langston Hughes", category: "associate", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Langston_Hughes_by_Carl_Van_Vechten_1936.jpg/220px-Langston_Hughes_by_Carl_Van_Vechten_1936.jpg", detail: "Du Bois published Hughes's early work in 'The Crisis' magazine, nurturing the Harlem Renaissance." },
      { id: "naacp", label: "NAACP", category: "organization", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/W.E.B._Du_Bois_by_James_E._Purdy%2C_1907_%28cropped%29.jpg/220px-W.E.B._Du_Bois_by_James_E._Purdy%2C_1907_%28cropped%29.jpg", detail: "Co-founded the NAACP in 1909 and edited its magazine 'The Crisis' for 24 years.", year: "1909" },
      { id: "barrington", label: "Great Barrington, MA", category: "place", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/W.E.B._Du_Bois_by_James_E._Purdy%2C_1907_%28cropped%29.jpg/220px-W.E.B._Du_Bois_by_James_E._Purdy%2C_1907_%28cropped%29.jpg", detail: "His birthplace. Now home to the W.E.B. Du Bois National Historic Site." },
      { id: "ghana", label: "Ghana", category: "place", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/W.E.B._Du_Bois_by_James_E._Purdy%2C_1907_%28cropped%29.jpg/220px-W.E.B._Du_Bois_by_James_E._Purdy%2C_1907_%28cropped%29.jpg", detail: "Moved to Ghana in 1961, became a citizen, and died there in 1963 — the day before the March on Washington." },
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
  const data = figureWebData[figureName];

  const nodePositions = useMemo(() => {
    if (!data) return [];
    const nodes = data.nodes;
    const count = nodes.length;
    // Place nodes in a circle around center
    return nodes.map((node, i) => {
      const angle = (i / count) * 2 * Math.PI - Math.PI / 2;
      const radius = 38; // % from center
      const x = 50 + radius * Math.cos(angle);
      const y = 50 + radius * Math.sin(angle);
      return { ...node, x, y };
    });
  }, [data]);

  if (!data) return null;

  const handleImageError = (id: string) => {
    setImageErrors(prev => new Set(prev).add(id));
  };

  const categoryEmoji: Record<WebNode["category"], string> = {
    family: "👪",
    event: "📅",
    associate: "🤝",
    place: "📍",
    organization: "🏛️",
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-background/95 backdrop-blur-md animate-fade-in"
        onClick={onClose}
      />

      <div className="relative z-10 w-full max-w-5xl max-h-[95vh] overflow-y-auto px-4 py-6">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-2 right-6 z-20 p-2 rounded-full bg-card border border-border hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Title */}
        <div className="text-center mb-4">
          <p className="text-primary font-body text-xs uppercase tracking-[0.3em] mb-1">
            Connection Web
          </p>
          <h3 className="text-2xl md:text-3xl font-display font-bold text-foreground">
            {figureName}
          </h3>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap justify-center gap-3 mb-6">
          {Object.entries(categoryLabels).map(([key, label]) => (
            <div key={key} className="flex items-center gap-1.5">
              <span
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: categoryColors[key as WebNode["category"]] }}
              />
              <span className="text-muted-foreground text-xs font-body">{label}</span>
            </div>
          ))}
        </div>

        {/* Web diagram */}
        <div className="relative w-full" style={{ paddingBottom: "100%", maxWidth: 700, margin: "0 auto" }}>
          <div className="absolute inset-0">
            {/* SVG connection lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
              {nodePositions.map((node) => (
                <line
                  key={`line-${node.id}`}
                  x1="50"
                  y1="50"
                  x2={node.x}
                  y2={node.y}
                  stroke={categoryColors[node.category]}
                  strokeWidth="0.3"
                  strokeOpacity={selectedNode?.id === node.id ? 0.9 : 0.35}
                  className="transition-all duration-300"
                />
              ))}
              {/* Concentric rings */}
              <circle cx="50" cy="50" r="38" fill="none" stroke="hsl(42 85% 55%)" strokeWidth="0.15" strokeOpacity="0.15" strokeDasharray="1 1" />
              <circle cx="50" cy="50" r="19" fill="none" stroke="hsl(42 85% 55%)" strokeWidth="0.1" strokeOpacity="0.1" strokeDasharray="0.5 1" />
            </svg>

            {/* Center node */}
            <div
              className="absolute rounded-full border-2 border-primary overflow-hidden shadow-gold cursor-default"
              style={{
                width: "16%",
                height: "16%",
                left: "42%",
                top: "42%",
              }}
            >
              <img
                src={data.image}
                alt={figureName}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center bg-card/60 backdrop-blur-sm">
                <span className="text-[0.55rem] md:text-xs font-display font-bold text-foreground text-center leading-tight px-1">
                  {figureName.split(" ").slice(-1)[0]}
                </span>
              </div>
            </div>

            {/* Outer nodes */}
            {nodePositions.map((node) => {
              const isSelected = selectedNode?.id === node.id;
              const hasError = imageErrors.has(node.id);
              return (
                <button
                  key={node.id}
                  onClick={() => setSelectedNode(isSelected ? null : node)}
                  className="absolute rounded-full overflow-hidden transition-all duration-300 group"
                  style={{
                    width: "10%",
                    height: "10%",
                    left: `${node.x - 5}%`,
                    top: `${node.y - 5}%`,
                    border: `2px solid ${categoryColors[node.category]}`,
                    boxShadow: isSelected
                      ? `0 0 0 2px ${categoryColors[node.category]}, 0 0 20px ${categoryColors[node.category]}60`
                      : `0 2px 8px ${categoryColors[node.category]}30`,
                    transform: isSelected ? "scale(1.25)" : "scale(1)",
                    zIndex: isSelected ? 10 : 1,
                  }}
                >
                  {!hasError ? (
                    <img
                      src={node.image}
                      alt={node.label}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      onError={() => handleImageError(node.id)}
                    />
                  ) : (
                    <div
                      className="w-full h-full flex items-center justify-center"
                      style={{ backgroundColor: categoryColors[node.category] }}
                    >
                      <span className="text-sm md:text-base">{categoryEmoji[node.category]}</span>
                    </div>
                  )}
                  {/* Label tooltip */}
                  <div
                    className="absolute inset-0 flex items-center justify-center bg-background/80 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <span className="text-[0.4rem] md:text-[0.55rem] font-display font-bold text-foreground text-center leading-tight px-0.5">
                      {node.label}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Detail panel */}
        {selectedNode && (
          <div className="mt-4 max-w-lg mx-auto bg-card border border-border rounded-xl p-5 animate-fade-up shadow-gold">
            <div className="flex items-start gap-4">
              <div
                className="w-14 h-14 rounded-full overflow-hidden flex-shrink-0 border-2"
                style={{ borderColor: categoryColors[selectedNode.category] }}
              >
                {!imageErrors.has(selectedNode.id) ? (
                  <img
                    src={selectedNode.image}
                    alt={selectedNode.label}
                    className="w-full h-full object-cover"
                    onError={() => handleImageError(selectedNode.id)}
                  />
                ) : (
                  <div
                    className="w-full h-full flex items-center justify-center"
                    style={{ backgroundColor: categoryColors[selectedNode.category] }}
                  >
                    <span className="text-xl">{categoryEmoji[selectedNode.category]}</span>
                  </div>
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-display font-bold text-foreground text-lg">
                    {selectedNode.label}
                  </h4>
                  {selectedNode.year && (
                    <span className="text-xs font-body bg-primary/20 text-primary px-2 py-0.5 rounded-full">
                      {selectedNode.year}
                    </span>
                  )}
                </div>
                <span
                  className="inline-block text-[0.65rem] font-body uppercase tracking-wider mt-0.5 px-2 py-0.5 rounded-full text-accent-foreground"
                  style={{ backgroundColor: categoryColors[selectedNode.category] + "30", color: categoryColors[selectedNode.category] }}
                >
                  {categoryLabels[selectedNode.category]}
                </span>
                <p className="text-muted-foreground font-body text-sm mt-2 leading-relaxed">
                  {selectedNode.detail}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConnectionWeb;
