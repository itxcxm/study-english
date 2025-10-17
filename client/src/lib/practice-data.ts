/**
 * Interface định nghĩa cấu trúc của một câu hỏi trong hệ thống luyện tập
 * @interface Question
 */
export interface Question {
    id: string;                    // ID duy nhất của câu hỏi
    question: string;               // Nội dung câu hỏi
    answers: string[];             // Mảng các lựa chọn trả lời
    correctAnswer: number;         // Index của đáp án đúng (0-based)
    explanation: string;           // Giải thích tại sao đáp án đó đúng
  }
  
/**
 * Dữ liệu câu hỏi từ vựng được tổ chức theo chủ đề
 * Mỗi chủ đề chứa một mảng các câu hỏi từ vựng
 * @constant vocabularyQuestions
 */
export const vocabularyQuestions: Record<string, Question[]> = {
    "daily-life": [
      {
        id: "dl-1",
        question: "I need to _____ the laundry before we go out.",
        answers: ["make", "do", "have", "take"],
        correctAnswer: 1,
        explanation: "Chúng ta sử dụng 'do the laundry' để nói về việc giặt quần áo."
      },
      {
        id: "dl-2",
        question: "She always _____ her bed in the morning.",
        answers: ["does", "makes", "has", "takes"],
        correctAnswer: 1,
        explanation: "'Make the bed' là cụm từ cố định có nghĩa là dọn giường."
      },
      {
        id: "dl-3",
        question: "Can you _____ the table for dinner?",
        answers: ["put", "set", "make", "do"],
        correctAnswer: 1,
        explanation: "'Set the table' nghĩa là chuẩn bị bàn ăn với đồ ăn và đồ dùng."
      },
      {
        id: "dl-4",
        question: "We need to _____ shopping for groceries today.",
        answers: ["make", "do", "go", "have"],
        correctAnswer: 2,
        explanation: "'Go shopping' là cách nói đi mua sắm."
      },
      {
        id: "dl-5",
        question: "He _____ a shower every morning before breakfast.",
        answers: ["makes", "does", "has", "takes"],
        correctAnswer: 3,
        explanation: "'Take a shower' là cách nói đi tắm trong tiếng Anh."
      }
    ],
    "work": [
      {
        id: "w-1",
        question: "I have a _____ meeting with my boss at 3 PM.",
        answers: ["scheduled", "planned", "organized", "arranged"],
        correctAnswer: 0,
        explanation: "'Scheduled meeting' là cuộc họp đã được lên lịch trước."
      },
      {
        id: "w-2",
        question: "She needs to _____ a deadline for the project.",
        answers: ["meet", "reach", "make", "have"],
        correctAnswer: 0,
        explanation: "'Meet a deadline' nghĩa là hoàn thành đúng thời hạn."
      },
      {
        id: "w-3",
        question: "The company decided to _____ him for the position.",
        answers: ["employ", "hire", "recruit", "engage"],
        correctAnswer: 1,
        explanation: "'Hire' là động từ phổ biến nhất để nói về việc tuyển dụng."
      },
      {
        id: "w-4",
        question: "I need to _____ my resignation letter next week.",
        answers: ["give", "submit", "send", "hand"],
        correctAnswer: 1,
        explanation: "'Submit' là từ formal để nói về việc nộp đơn từ chức."
      },
      {
        id: "w-5",
        question: "They are working _____ to finish the project on time.",
        answers: ["hardly", "hard", "hardness", "harden"],
        correctAnswer: 1,
        explanation: "'Work hard' nghĩa là làm việc chăm chỉ. 'Hardly' có nghĩa khác (hầu như không)."
      }
    ],
    "travel": [
      {
        id: "t-1",
        question: "We need to _____ our flight tickets in advance.",
        answers: ["book", "reserve", "order", "buy"],
        correctAnswer: 0,
        explanation: "'Book tickets' là cách nói phổ biến nhất về việc đặt vé."
      },
      {
        id: "t-2",
        question: "Don't forget to _____ your passport before traveling.",
        answers: ["bring", "take", "carry", "pack"],
        correctAnswer: 3,
        explanation: "'Pack' thường dùng khi chuẩn bị đồ đạc vào vali/túi."
      },
      {
        id: "t-3",
        question: "The plane will _____ at 6 AM tomorrow.",
        answers: ["take off", "take up", "take in", "take on"],
        correctAnswer: 0,
        explanation: "'Take off' nghĩa là cất cánh (máy bay)."
      },
      {
        id: "t-4",
        question: "We should _____ at the hotel before noon.",
        answers: ["check out", "check in", "check up", "check over"],
        correctAnswer: 1,
        explanation: "'Check in' nghĩa là làm thủ tục nhận phòng khách sạn."
      },
      {
        id: "t-5",
        question: "This tour _____ includes accommodation and meals.",
        answers: ["package", "deal", "offer", "plan"],
        correctAnswer: 0,
        explanation: "'Tour package' là gói du lịch trọn gói."
      }
    ],
    "education": [
      {
        id: "e-1",
        question: "Students must _____ the exam to pass the course.",
        answers: ["take", "make", "do", "have"],
        correctAnswer: 0,
        explanation: "'Take an exam' là cách nói tham gia kỳ thi."
      },
      {
        id: "e-2",
        question: "She _____ an A in mathematics last semester.",
        answers: ["took", "made", "got", "had"],
        correctAnswer: 2,
        explanation: "'Get a grade' nghĩa là đạt được điểm số."
      },
      {
        id: "e-3",
        question: "The teacher asked us to _____ our homework by Friday.",
        answers: ["hand in", "hand out", "hand over", "hand down"],
        correctAnswer: 0,
        explanation: "'Hand in' nghĩa là nộp bài tập."
      },
      {
        id: "e-4",
        question: "He decided to _____ for a scholarship.",
        answers: ["apply", "ask", "request", "demand"],
        correctAnswer: 0,
        explanation: "'Apply for' là cách nói đăng ký, nộp đơn xin học bổng."
      },
      {
        id: "e-5",
        question: "The lecture will _____ place in room 301.",
        answers: ["take", "make", "have", "do"],
        correctAnswer: 0,
        explanation: "'Take place' nghĩa là diễn ra."
      }
    ],
    "technology": [
      {
        id: "tech-1",
        question: "I need to _____ my computer because it's running slowly.",
        answers: ["restart", "reload", "refresh", "reopen"],
        correctAnswer: 0,
        explanation: "'Restart' nghĩa là khởi động lại máy tính."
      },
      {
        id: "tech-2",
        question: "Make sure to _____ your work regularly to avoid losing it.",
        answers: ["keep", "store", "save", "hold"],
        correctAnswer: 2,
        explanation: "'Save' là lưu file trong máy tính."
      },
      {
        id: "tech-3",
        question: "The new software update will _____ automatically tonight.",
        answers: ["download", "upload", "install", "load"],
        correctAnswer: 2,
        explanation: "'Install' nghĩa là cài đặt phần mềm."
      },
      {
        id: "tech-4",
        question: "You can _____ the file to your email as an attachment.",
        answers: ["attach", "connect", "link", "join"],
        correctAnswer: 0,
        explanation: "'Attach' nghĩa là đính kèm file vào email."
      },
      {
        id: "tech-5",
        question: "The website crashed due to heavy _____.",
        answers: ["traffic", "visitors", "users", "people"],
        correctAnswer: 0,
        explanation: "'Traffic' trong ngữ cảnh web nghĩa là lưu lượng truy cập."
      }
    ],
    "health": [
      {
        id: "h-1",
        question: "She has a terrible _____ and needs to see a doctor.",
        answers: ["pain", "ache", "hurt", "sore"],
        correctAnswer: 0,
        explanation: "'Pain' là từ chung để chỉ cơn đau nghiêm trọng."
      },
      {
        id: "h-2",
        question: "The doctor _____ him some antibiotics for his infection.",
        answers: ["gave", "prescribed", "ordered", "suggested"],
        correctAnswer: 1,
        explanation: "'Prescribe' là kê đơn thuốc (dùng cho bác sĩ)."
      },
      {
        id: "h-3",
        question: "Regular exercise can help you _____ fit and healthy.",
        answers: ["keep", "stay", "maintain", "remain"],
        correctAnswer: 1,
        explanation: "'Stay fit' là cụm từ phổ biến nghĩa là giữ gìn sức khỏe."
      },
      {
        id: "h-4",
        question: "You should _____ a balanced diet to improve your health.",
        answers: ["eat", "have", "take", "make"],
        correctAnswer: 1,
        explanation: "'Have a balanced diet' nghĩa là có chế độ ăn cân bằng."
      },
      {
        id: "h-5",
        question: "He needs to _____ weight for health reasons.",
        answers: ["lose", "reduce", "decrease", "drop"],
        correctAnswer: 0,
        explanation: "'Lose weight' là cách nói giảm cân."
      }
    ]
  };
  
/**
 * Dữ liệu câu hỏi ngữ pháp được tổ chức theo chủ đề
 * Mỗi chủ đề chứa một mảng các câu hỏi ngữ pháp
 * @constant grammarQuestions
 */
export const grammarQuestions: Record<string, Question[]> = {
    "tenses": [
      {
        id: "t-1",
        question: "I _____ to Paris three times this year.",
        answers: ["have been", "was", "am", "had been"],
        correctAnswer: 0,
        explanation: "Dùng Present Perfect (have been) vì hành động xảy ra nhiều lần trong khoảng thời gian còn tiếp diễn (this year)."
      },
      {
        id: "t-2",
        question: "She _____ a book when I called her yesterday.",
        answers: ["read", "was reading", "has read", "reads"],
        correctAnswer: 1,
        explanation: "Dùng Past Continuous (was reading) vì hành động đang diễn ra tại một thời điểm cụ thể trong quá khứ."
      },
      {
        id: "t-3",
        question: "By next month, I _____ here for five years.",
        answers: ["will work", "will be working", "will have worked", "work"],
        correctAnswer: 2,
        explanation: "Dùng Future Perfect (will have worked) vì hành động sẽ hoàn thành trước một thời điểm trong tương lai."
      },
      {
        id: "t-4",
        question: "They _____ football every Sunday morning.",
        answers: ["play", "are playing", "have played", "played"],
        correctAnswer: 0,
        explanation: "Dùng Present Simple (play) để diễn tả thói quen, hành động lặp lại thường xuyên."
      },
      {
        id: "t-5",
        question: "We _____ the project before the deadline last week.",
        answers: ["finished", "have finished", "had finished", "finish"],
        correctAnswer: 2,
        explanation: "Dùng Past Perfect (had finished) vì hành động hoàn thành trước một thời điểm/hành động khác trong quá khứ."
      }
    ],
    "conditionals": [
      {
        id: "c-1",
        question: "If it _____ tomorrow, we will cancel the picnic.",
        answers: ["rains", "will rain", "rained", "would rain"],
        correctAnswer: 0,
        explanation: "Câu điều kiện loại 1: If + Present Simple, will + V. Diễn tả điều có thể xảy ra trong tương lai."
      },
      {
        id: "c-2",
        question: "If I _____ rich, I would travel around the world.",
        answers: ["am", "was", "were", "will be"],
        correctAnswer: 2,
        explanation: "Câu điều kiện loại 2: If + Past Simple (dùng 'were' cho tất cả ngôi), would + V. Diễn tả điều không có thật ở hiện tại."
      },
      {
        id: "c-3",
        question: "If she had studied harder, she _____ the exam.",
        answers: ["would pass", "will pass", "would have passed", "passed"],
        correctAnswer: 2,
        explanation: "Câu điều kiện loại 3: If + Past Perfect, would have + V3. Diễn tả điều không có thật trong quá khứ."
      },
      {
        id: "c-4",
        question: "If you heat water to 100°C, it _____.",
        answers: ["will boil", "boils", "would boil", "boiled"],
        correctAnswer: 1,
        explanation: "Câu điều kiện loại 0: If + Present Simple, Present Simple. Diễn tả sự thật hiển nhiên, quy luật tự nhiên."
      },
      {
        id: "c-5",
        question: "I wouldn't have been late if the bus _____ on time.",
        answers: ["arrived", "had arrived", "arrives", "would arrive"],
        correctAnswer: 1,
        explanation: "Câu điều kiện loại 3: Mệnh đề if dùng Past Perfect (had arrived)."
      }
    ],
    "passive-voice": [
      {
        id: "pv-1",
        question: "The letter _____ by Mary yesterday.",
        answers: ["was written", "wrote", "is written", "has written"],
        correctAnswer: 0,
        explanation: "Câu bị động thì Past Simple: was/were + V3. 'Yesterday' là dấu hiệu thì quá khứ."
      },
      {
        id: "pv-2",
        question: "This room _____ every day.",
        answers: ["cleans", "is cleaned", "was cleaned", "has cleaned"],
        correctAnswer: 1,
        explanation: "Câu bị động thì Present Simple: am/is/are + V3. 'Every day' là dấu hiệu thì hiện tại."
      },
      {
        id: "pv-3",
        question: "The project _____ by the team next month.",
        answers: ["will complete", "will be completed", "is completed", "completes"],
        correctAnswer: 1,
        explanation: "Câu bị động thì Future Simple: will be + V3. 'Next month' là dấu hiệu thì tương lai."
      },
      {
        id: "pv-4",
        question: "The cake _____ by my mother right now.",
        answers: ["is being made", "is made", "was made", "makes"],
        correctAnswer: 0,
        explanation: "Câu bị động thì Present Continuous: am/is/are being + V3. 'Right now' là dấu hiệu."
      },
      {
        id: "pv-5",
        question: "The car _____ before we arrived.",
        answers: ["had been repaired", "was repaired", "is repaired", "repaired"],
        correctAnswer: 0,
        explanation: "Câu bị động thì Past Perfect: had been + V3. Hành động xảy ra trước hành động khác trong quá khứ."
      }
    ],
    "reported-speech": [
      {
        id: "rs-1",
        question: "She said that she _____ tired.",
        answers: ["is", "was", "has been", "will be"],
        correctAnswer: 1,
        explanation: "Trong câu tường thuật, 'is' chuyển thành 'was' (lùi thì)."
      },
      {
        id: "rs-2",
        question: "He told me that he _____ to the party the next day.",
        answers: ["will go", "would go", "goes", "went"],
        correctAnswer: 1,
        explanation: "Trong câu tường thuật, 'will' chuyển thành 'would'. 'Tomorrow' thành 'the next day'."
      },
      {
        id: "rs-3",
        question: "They asked me where I _____.",
        answers: ["live", "lived", "am living", "have lived"],
        correctAnswer: 1,
        explanation: "Trong câu hỏi gián tiếp (reported question), 'do you live' chuyển thành 'lived' (lùi thì)."
      },
      {
        id: "rs-4",
        question: "She asked if I _____ help her with the homework.",
        answers: ["can", "could", "will", "would"],
        correctAnswer: 1,
        explanation: "Trong câu tường thuật, 'can' chuyển thành 'could'."
      },
      {
        id: "rs-5",
        question: "He said that he _____ the movie the previous week.",
        answers: ["saw", "had seen", "has seen", "sees"],
        correctAnswer: 1,
        explanation: "Trong câu tường thuật, Past Simple chuyển thành Past Perfect. 'Last week' thành 'the previous week'."
      }
    ],
    "modal-verbs": [
      {
        id: "mv-1",
        question: "You _____ wear a helmet when riding a motorcycle.",
        answers: ["must", "can", "may", "might"],
        correctAnswer: 0,
        explanation: "'Must' diễn tả sự bắt buộc, nghĩa vụ phải làm gì đó."
      },
      {
        id: "mv-2",
        question: "She _____ speak three languages fluently.",
        answers: ["must", "should", "can", "might"],
        correctAnswer: 2,
        explanation: "'Can' diễn tả khả năng làm được điều gì đó."
      },
      {
        id: "mv-3",
        question: "You _____ see a doctor if you feel sick.",
        answers: ["should", "must", "can", "may"],
        correctAnswer: 0,
        explanation: "'Should' diễn tả lời khuyên nên làm gì."
      },
      {
        id: "mv-4",
        question: "It _____ rain later, so take an umbrella.",
        answers: ["should", "must", "might", "can"],
        correctAnswer: 2,
        explanation: "'Might' diễn tả khả năng có thể xảy ra nhưng không chắc chắn."
      },
      {
        id: "mv-5",
        question: "_____ I borrow your pen for a moment?",
        answers: ["Should", "Must", "May", "Might"],
        correctAnswer: 2,
        explanation: "'May' dùng để xin phép lịch sự."
      }
    ],
    "relative-clauses": [
      {
        id: "rc-1",
        question: "The woman _____ lives next door is a teacher.",
        answers: ["who", "which", "whose", "whom"],
        correctAnswer: 0,
        explanation: "'Who' thay thế cho người làm chủ ngữ trong mệnh đề quan hệ."
      },
      {
        id: "rc-2",
        question: "This is the book _____ I told you about.",
        answers: ["who", "which", "whose", "whom"],
        correctAnswer: 1,
        explanation: "'Which' thay thế cho vật trong mệnh đề quan hệ."
      },
      {
        id: "rc-3",
        question: "The man _____ car was stolen called the police.",
        answers: ["who", "which", "whose", "whom"],
        correctAnswer: 2,
        explanation: "'Whose' chỉ sở hữu (car của người đàn ông)."
      },
      {
        id: "rc-4",
        question: "The city _____ we visited last year was beautiful.",
        answers: ["where", "which", "when", "whose"],
        correctAnswer: 0,
        explanation: "'Where' thay thế cho nơi chốn trong mệnh đề quan hệ."
      },
      {
        id: "rc-5",
        question: "I remember the day _____ we first met.",
        answers: ["where", "which", "when", "whose"],
        correctAnswer: 2,
        explanation: "'When' thay thế cho thời gian trong mệnh đề quan hệ."
      }
    ],
    "articles": [
      {
        id: "a-1",
        question: "She is _____ engineer at a big company.",
        answers: ["a", "an", "the", "no article"],
        correctAnswer: 1,
        explanation: "Dùng 'an' trước nguyên âm (engineer)."
      },
      {
        id: "a-2",
        question: "_____ sun rises in the east.",
        answers: ["A", "An", "The", "No article"],
        correctAnswer: 2,
        explanation: "Dùng 'the' trước danh từ chỉ vật duy nhất (mặt trời)."
      },
      {
        id: "a-3",
        question: "I need _____ information about the course.",
        answers: ["a", "an", "the", "no article"],
        correctAnswer: 3,
        explanation: "Không dùng mạo từ trước danh từ không đếm được có nghĩa chung chung."
      },
      {
        id: "a-4",
        question: "This is _____ best restaurant in town.",
        answers: ["a", "an", "the", "no article"],
        correctAnswer: 2,
        explanation: "Dùng 'the' trước so sánh nhất (best)."
      },
      {
        id: "a-5",
        question: "He plays _____ piano very well.",
        answers: ["a", "an", "the", "no article"],
        correctAnswer: 2,
        explanation: "Dùng 'the' trước tên nhạc cụ."
      }
    ],
    "prepositions": [
      {
        id: "p-1",
        question: "I'll meet you _____ the station at 5 PM.",
        answers: ["in", "at", "on", "to"],
        correctAnswer: 1,
        explanation: "Dùng 'at' trước địa điểm cụ thể (nhà ga)."
      },
      {
        id: "p-2",
        question: "She was born _____ May 15th, 1995.",
        answers: ["in", "at", "on", "to"],
        correctAnswer: 2,
        explanation: "Dùng 'on' trước ngày tháng cụ thể."
      },
      {
        id: "p-3",
        question: "We usually have lunch _____ noon.",
        answers: ["in", "at", "on", "to"],
        correctAnswer: 1,
        explanation: "Dùng 'at' trước giờ cụ thể hoặc thời điểm đặc biệt (noon, night, midnight)."
      },
      {
        id: "p-4",
        question: "They arrived _____ London yesterday.",
        answers: ["in", "at", "on", "to"],
        correctAnswer: 0,
        explanation: "Dùng 'in' trước tên thành phố, quốc gia (địa điểm rộng)."
      },
      {
        id: "p-5",
        question: "The book is _____ the table.",
        answers: ["in", "at", "on", "to"],
        correctAnswer: 2,
        explanation: "Dùng 'on' khi vật ở trên bề mặt của cái gì đó."
      }
    ]
  };
  
/**
 * Hàm lấy câu hỏi theo loại và chủ đề
 * @param type - Loại câu hỏi: "vocabulary" hoặc "grammar"
 * @param topic - Chủ đề cụ thể (ví dụ: "daily-life", "tenses", etc.)
 * @returns Mảng các câu hỏi tương ứng với loại và chủ đề
 * @example
 * getQuestions("vocabulary", "daily-life") // Trả về câu hỏi từ vựng về cuộc sống hàng ngày
 * getQuestions("grammar", "tenses") // Trả về câu hỏi ngữ pháp về thì
 */
export function getQuestions(type: string, topic: string): Question[] {
    // Kiểm tra loại câu hỏi và trả về dữ liệu tương ứng
    if (type === "vocabulary") {
      return vocabularyQuestions[topic] || [];  // Trả về câu hỏi từ vựng hoặc mảng rỗng nếu không tìm thấy
    } else if (type === "grammar") {
      return grammarQuestions[topic] || [];     // Trả về câu hỏi ngữ pháp hoặc mảng rỗng nếu không tìm thấy
    }
    return [];  // Trả về mảng rỗng nếu loại không hợp lệ
  }
  