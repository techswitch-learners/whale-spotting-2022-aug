export interface Sighting {
  id: number;
  species: string;
  imageUrl: string;
  description: string;
  whaleCount: number;
  confirmationStatus: string;
  location: string;
  latitude: number;
  longitude: number;
}

const dataList = [
  {
    id: 1,
    species: "Southern right whale",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/Southern_right_whale.jpg/330px-Southern_right_whale.jpg",
    description:
      "The southern right whale (Eubalaena australis) is a baleen whale, one of three species classified as right whales belonging to the genus Eubalaena. Southern right whales inhabit oceans south of the Equator, between the latitudes of 20° and 60° south.[5] In 2009 the global population was estimated to be approximately 13,600.[6]",
    whaleCount: 5,
    confirmationStatus: "approved",
    location: "Pacific Ocean",
    latitude: 5,
    longitude: 5,
  },
  {
    id: 2,
    species: "North Atlantic right whale",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/6/6a/Eubalaena_glacialis_with_calf.jpg",
    description:
      "The North Atlantic right whale (Eubalaena glacialis) is a baleen whale, one of three right whale species belonging to the genus Eubalaena,[1] all of which were formerly classified as a single species. Because of their docile nature, their slow surface-skimming feeding behaviors, their tendencies to stay close to the coast, and their high blubber content (which makes them float when they are killed, and which produced high yields of whale oil), right whales were once a preferred target for whalers. At present, they are among the most endangered whales in the world,[6] and they are protected under the U.S. Endangered Species Act and Marine Mammal Protection Act and Canada's Species at Risk Act. There are fewer than 366[7] individuals in existence in the western North Atlantic Ocean—they migrate between feeding grounds in the Labrador Sea and their winter calving areas off Georgia and Florida, an ocean area with heavy shipping traffic. In the eastern North Atlantic, on the other hand—with a total population reaching into the low teens at most—scientists believe that they may already be functionally extinct.[6] Vessel strikes and entanglement in fixed fishing gear, which together account for nearly half of all North Atlantic right whale mortality since 1970,[8] are their two greatest threats to recovery.[9][10]]",
    whaleCount: 3,
    confirmationStatus: "approved",
    location: "Atlantic Ocean",
    latitude: 6,
    longitude: 7,
  },
  {
    id: 3,
    species: "North Pacific right whale",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/3/37/Eubalaena_japonica_drawing.jpg",
    description:
      "The North Pacific right whale (Eubalaena japonica) is a very large, thickset baleen whale species that is extremely rare and endangered.\n" +
      "\n" +
      "The Northeast Pacific population, which summers in the southeastern Bering Sea and Gulf of Alaska, may have no more than 40 animals. A western population that summers near the Commander Islands, the coast of Kamchatka, along the Kuril Islands and in the Sea of Okhotsk is thought to number in the low hundreds. Before commercial whaling in the North Pacific (i.e. pre-1835) there were probably over 20,000 right whales in the region. The taking of right whales in commercial whaling has been prohibited by one or more international treaties since 1935. Nevertheless, between 1962 and 1968, illegal Soviet whaling killed at least 529 right whales in the Bering Sea and Gulf of Alaska as well as at least 132 right whales in the Sea of Okhotsk,[5] plus an additional 104 North Pacific right whales from unspecified areas.[6]\n" +
      "\n" +
      'The International Union for Conservation of Nature categorizes the species as "Endangered", and categorizes the Northeast Pacific population as "Critically Endangered".[7] The Center for Biological Diversity argues that the North Pacific right whale is the most endangered whale on Earth.[8]',
    whaleCount: 3,
    confirmationStatus: "approved",
    location: "Atlantic Ocean",
    latitude: 6,
    longitude: 7,
  },
];

export const sightingData: Sighting[] = dataList;
