import { NumberValueAccessor } from '@angular/forms/src/directives';

export interface QuestionData {
  que: string;
  option1: string;
  option2: string;
  option3: string;
  option4: string;
  mark: number;
  correctOption: string;
}
