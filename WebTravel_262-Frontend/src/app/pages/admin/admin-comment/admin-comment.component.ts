import { Component, OnInit } from '@angular/core';
import { Destination, Comment } from 'src/app/models/destinations.model';
import { DestinationService } from 'src/app/services/destinations.service';

@Component({
  selector: 'app-admin-comment',
  templateUrl: './admin-comment.component.html',
  styleUrls: ['./admin-comment.component.css']
})
export class AdminCommentComponent implements OnInit {
  destinations: Destination[] = [];

  constructor(private destinationService: DestinationService) { }

  ngOnInit(): void {
    this.loadDestinationsWithComments();
  }

  loadDestinationsWithComments() {
    this.destinationService.getAllWithComments().subscribe((destinations: Destination[]) => {
      this.destinations = destinations;
    });
  }
  
  deleteComment(destinationId: string, commentId: string) {
    this.destinationService.deleteComment(destinationId, commentId).subscribe(() => {
      this.loadDestinationsWithComments();
    });
  }
  
}
