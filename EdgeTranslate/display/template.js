var template = '<i class="translate-icon-close"></i>' + 
               '<div class="translate-main-meaning">' + 
                   '<p class="translate-main-meaning-content"><% this.mainMeaning %></p>' + 
               '</div>' + 
               '<div class="translate-common-meanings">' + 
                   '<p class="translate-common-meanings-title">常见意思：</p>' + 
                   '<p class="translate-common-meanings-content"><% this.commonMeanings %></p>' + 
               '</div>' + 
               '<div class="translate-detailed-meanings">' + 
                   '<p class="translate-detailed-meanings-title">单词详解：</p>' + 
                   '<% for (let i in this.detailedMeanings) { %>' + 
                       '<p class="translate-detailed-meanings-content">' + 
                           '<span class="translate-detailed-meanings-word-type"><% this.detailedMeanings[i].type + ": " %></span>' + 
                           '<span class="translate-detailed-meanings-word-meaning"><% this.detailedMeanings[i].meaning %></span>' + 
                       '</p>' + 
                   '<% } %>' + 
               '</div>' + 
               '<div class="translate-synonyms">' + 
                   '<p class="translate-synonyms-title">近同义词：</p>' + 
                   '<% for (let i in this.synonyms) { %>' + 
                       '<p class="translate-synonyms-content">' + 
                           '<span class="translate-synonyms-word-type"><% this.synonyms[i].type + ": " %></span>' + 
                           '<span class="translate-synonyms-words"><% this.synonyms[i].words[0] %></span>' + 
                       '</p>' + 
                   '<% } %>' + 
               '</div>';