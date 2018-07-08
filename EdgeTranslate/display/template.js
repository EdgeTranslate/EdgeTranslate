var template = '<i class="translate-icon-close"></i>' + 
               '<div class="translate-main-meaning">' + 
                   '<p class="translate-main-meaning-content"><% this.mainMeaning %></p>' + 
               '</div>' + 
               '<div class="translate-common-meanings">' + 
                   '<% if (this.commonMeanings && this.commonMeanings.length > 0) { %>' + 
                       '<p class="translate-content-title">常见意思：</p>' + 
                       '<p class="translate-common-meanings-content"><% this.commonMeanings %></p>' + 
                   '<% } %>' + 
               '</div>' + 
               '<div class="translate-detailed-meanings">' + 
                   '<% if (this.detailedMeanings && this.detailedMeanings.length > 0) { %>' + 
                       '<p class="translate-content-title">单词详解：</p>' + 
                       '<% for (let i in this.detailedMeanings) { %>' + 
                           '<p class="translate-detailed-meanings-content">' + 
                               '<span class="translate-word-type"><% this.detailedMeanings[i].type + ": " %></span>' + 
                               '<span class="translate-detailed-meanings-word-meaning"><% this.detailedMeanings[i].meaning %></span>' + 
                           '</p>' + 
                       '<% } %>' + 
                   '<% } %>' + 
               '</div>' + 
               '<div class="translate-definitions">' + 
                   '<% if (this.definitions && this.definitions.length > 0) { %>' + 
                       '<p class="translate-content-title">单词定义：</p>' + 
                       '<% for (let i in this.definitions) { %>' + 
                           '<div class="translate-definitions-content">' + 
                               '<p class="translate-word-type"><% this.definitions[i].type + ": " %></p>' + 
                               '<ul class="translate-definitions-list">' + 
                                   '<% for (let j in this.definitions[i].meanings) { %>' + 
                                       '<li>' + 
                                           '<p>释义：<% this.definitions[i].meanings[j].meaning %></p>' + 
                                           '<p>示例：<% this.definitions[i].meanings[j].example %></p>' + 
                                       '</li>' + 
                                   '<% } %>' + 
                               '</ul>' + 
                           '</div>' + 
                       '<% } %>' + 
                   '<% } %>' + 
               '</div>' + 
               '<div class="translate-synonyms">' + 
                   '<% if (this.synonyms && this.synonyms.length > 0) { %>' + 
                       '<p class="translate-content-title">近同义词：</p>' + 
                       '<% for (let i in this.synonyms) { %>' + 
                           '<p class="translate-synonyms-content">' + 
                               '<span class="translate-word-type"><% this.synonyms[i].type + ": " %></span>' + 
                               '<span class="translate-synonyms-words"><% this.synonyms[i].words[0] %></span>' + 
                           '</p>' + 
                       '<% } %>' + 
                   '<% } %>' +
               '</div>' + 
               '<div class="translate-phrases">' + 
                   '<% if (this.phrases && this.phrases.length > 0) { %>' + 
                       '<p class="translate-content-title">常用短语：</p>' + 
                       '<ul class="translate-phrases-list">' + 
                           '<% for (let i in this.phrases) { %>' + 
                               '<li><% this.phrases[i] %></li>' + 
                           '<% } %>' + 
                       '</ul>' + 
                   '<% } %>' + 
               '</div>' + 
               '<div class="translate-examples">' + 
                   '<% if (this.examples && this.examples.length > 0) { %>' + 
                       '<p class="translate-content-title">典型例句：</p>' + 
                       '<ul class="translate-examples-list">' + 
                           '<% for (let i in this.examples) { %>' + 
                               '<li><% this.examples[i] %></li>' + 
                           '<% } %>' + 
                       '</ul>' + 
                   '<% } %>' + 
               '</div>';