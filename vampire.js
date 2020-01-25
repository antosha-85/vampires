class Vampire {
  constructor(name, yearConverted) {
    this.name = name;
    this.yearConverted = yearConverted;
    this.offspring = [];
    this.creator = null;
  }

  /** Simple tree methods **/

  // Adds the vampire as an offspring of this vampire
  addOffspring(vampire) {
    this.offspring.push(vampire);
    vampire.creator = this;
  }

  // Returns the total number of vampires created by that vampire
  get numberOfOffspring() {
    return this.offspring.length;

  }

  // Returns the number of vampires away from the original vampire this vampire is
  get numberOfVampiresFromOriginal() {
    let numberOfOffspring = 0;
    let currentVampire = this;

    while (currentVampire.creator) {
      currentVampire = currentVampire.creator;
      numberOfOffspring++;
    }
    return numberOfOffspring;
  }

  // Returns true if this vampire is more senior than the other vampire. (Who is closer to the original vampire)
  isMoreSeniorThan(vampire) {
    if (this.numberOfVampiresFromOriginal < vampire.numberOfVampiresFromOriginal) {
      return true;
    } return false;
  }

  /** Tree traversal methods **/

  // Returns the vampire object with that name, or null if no vampire exists with that name
  vampireWithName(name) {
    if (this.name === name) {
      return this;
    } else {
      for (const childNode of this.offspring) {
        childNode.vampireWithName(name);
        const vampWithName = childNode.vampireWithName(name);
        if (vampWithName) {
          return vampWithName;
        }
      }
      return null;
    }
  }


  // Returns the total number of vampires that exist
  get totalDescendents() {
    let numberOfDescendents = 0;
      for (const childNode of this.offspring) {
        numberOfDescendents += 1 + childNode.totalDescendents
      }
      return numberOfDescendents;
  }

  // Returns an array of all the vampires that were converted after 1980
  get allMillennialVampires() {
    let convertedAfter1980 = [];
    if (this.yearConverted > 1980) {
      convertedAfter1980.push(this);
    }
    for (const childNode of this.offspring) {
      const vampires = childNode.allMillennialVampires;
      convertedAfter1980 = convertedAfter1980.concat(vampires)
    }
    return convertedAfter1980;
  }
  

  /** Stretch **/

  // Returns the closest common ancestor of two vampires.
  // The closest common anscestor should be the more senior vampire if a direct ancestor is used.
  // For example:
  // * when comparing Ansel and Sarah, Ansel is the closest common anscestor.
  // * when comparing Ansel and Andrew, Ansel is the closest common anscestor.
  closestCommonAncestor(vampire) {

  }
}

module.exports = Vampire;

